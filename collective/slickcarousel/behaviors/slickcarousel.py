# -*- coding: utf-8 -*-
from zope.interface import alsoProvides, implements
from zope.component import adapts
from zope import schema
from plone.supermodel import model
from plone.dexterity.interfaces import IDexterityContainer
from plone.autoform.interfaces import IFormFieldProvider
from plone.app.uuid.utils import uuidToCatalogBrain, uuidToObject
from plone.namedfile import field as namedfile

from plone.app.contenttypes import _

class ISlideshow(model.Schema):
	pass

class Slideshow(object):
	implements(ISlideshow)
	adapts(IDexterityContainer)

	def __init__(self, context):
		self.context = context

from Acquisition import aq_inner
from zope.component import getUtility
from Products.Five import BrowserView
from Products.CMFCore.utils import getToolByName
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from Products.CMFPlone.interfaces import IPloneSiteRoot
from AccessControl import getSecurityManager
import json

try:
    from collective.flowplayer.interfaces import IFlowPlayable
    FLOWPLAYER_EXISTS = True
except ImportError:
    FLOWPLAYER_EXISTS = False

# # # # #
# Views #
# # # # #

class getSlideshowItem(BrowserView):
    """ Class that extracts relevant information for the slideshow
    """
    def getJSON(self):
        if hasattr(self.request, 'presentation'):
            presentation = self.request['presentation']
        else:
            presentation = "false"
        
        presentationMode = False
        
        if presentation.find("true") != -1:
            presentationMode = True
        
        callback = hasattr(self.request, 'callback') and 'json' + self.request['callback'] or None
        
        media = self.getMediaURL()
        mediaType = self.getMediaType()
        
        if hasattr(self.context, "title"):
            title = self.context.title
        elif hasattr(self.context, "Title"):
            title = self.context.Title()
        else:
            title = ""
        
        if presentationMode and hasattr(self.context, 'aq_explicit') and hasattr(self.context.aq_explicit, "getText"):
                description = self.context.getText()
        elif hasattr(self, "description"):
            description = self.context.description
        elif hasattr(self.context, "Description"):
            description = self.context.Description()
        else:
            description = ""
            
        type = self.context.portal_type
        
        #python to json encoding
        jsonStr = json.dumps({"title": title, "description":description, "type": type, "media": {"url": media, "type": mediaType}})
        
        #Manual encoding 
        #jsonStr = '{"title": "'+title+'", "description": "'+description+'", "type": "'+type+'", "media": {"url": "'+media+'", "type//" : "'+mediaType+'"}}'
        
        if callback is not None:
            return callback +'(' + jsonStr + ')'
        else:
            return jsonStr
        
    def sanitizeStringForJson(self, str):
        str = str.replace("\n", " ").replace('"', '\\"').replace("'", "\\'");
        return str
     
    def getMediaURL(self):
        """ finds and returns relevant leading media for the context item
        """
        item = self.context
        
        if(self.isVideo(item)):
            return item.absolute_url()
        
        if item.portal_type == 'Image':
            return item.absolute_url() + '/@@images/image/large'
        
        if (item.portal_type == 'Link') and (item.remoteUrl.find("youtube.com") > -1 or item.remoteUrl.find("vimeo.com") > -1):
            return item.remoteUrl
        
        catalog = getToolByName(self.context, 'portal_catalog')
        plone_utils = getToolByName(self.context, 'plone_utils')
        path = '/'.join(item.getPhysicalPath())
        
        if plone_utils.isStructuralFolder(item):
            results = catalog.searchResults(path = {'query' : path,'depth' : 1 }, type = ['Image', 'File'], sort_on = 'getObjPositionInParent')
            if len(results) > 0:
                leadMedia = results[0]
                if leadMedia.portal_type == 'Image':
                    return leadMedia.getURL() + '/@@images/image/large'
                else:
                    return leadMedia.getURL()
            else:
                return ""
        else:
            #TODO: Add lead image support and News Item Image support
            return ""
        
    def getMediaType(self):
        """ Finds and returns the type of lead media
        """ 
        item = self.context
        
        try:
            if(self.isVideo(item)):
                return "Video"
            elif (item.portal_type == 'Link' or item.portal_type == "MediaLink") and item.remoteUrl.find("youtube.com") > -1:
                return "Youtube"
            elif (item.portal_type == 'Link' or item.portal_type == "MediaLink") and item.remoteUrl.find("vimeo.com") > -1:
                return "Vimeo"
            else:
                return "Image"
        except:
            if(self.isVideo(item)):
                return "Video"
            elif (item.portal_type == 'Link' or item.portal_type == "MediaLink") and item.getObject().remoteUrl.find("youtube.com") > -1:
                return "Youtube"
            elif (item.portal_type == 'Link' or item.portal_type == "MediaLink") and item.getObject().remoteUrl.find("vimeo.com") > -1:
                return "Vimeo"
            else:
                return "Image"
    
    def isVideo(self, item):
        if FLOWPLAYER_EXISTS:
            result = IFlowPlayable.providedBy(item)
        else:
            result = False
        return result

class slideshowListingView(BrowserView):
    """ Class that extracts relevant information for the slideshow
    """
    def getJSON(self):
        parent = self.context.aq_parent

        recursiveMode = True
        callback = hasattr(self.request, 'callback') and 'json' + self.request['callback'] or None
        jsonStr = ""

        is_edit_view = False
        edit_view = self.request.get('edit')
        if edit_view:
            is_edit_view = True

        results = self.getListMedia(self.context, is_edit_view)

        if parent:
            if parent.portal_type == "Object":
                if 'prive' in parent:
                    prive_folder = parent['prive']
                    contents = self.getListMedia(prive_folder, is_edit_view)
                    results.extend(contents)

        jsonStr = json.dumps(results)

        if callback is not None:
            return callback +'(' + jsonStr + ')'
        else:
            return jsonStr

    def getListMedia(self, item, is_edit_view=False):
        is_book  = False
        if hasattr(self.request, 'book_view'):
            is_book = True

        jsonStr = ""
        recursiveMode = True

        catalog = getToolByName(self.context, 'portal_catalog')
        plone_utils = getToolByName(self.context, 'plone_utils')
        path = '/'.join(item.getPhysicalPath())

        if item.portal_type == "Folder" or (item.restrictedTraverse('@@plone').isStructuralFolder()  and (item.portal_type != "Topic" and item.portal_type != "Collection") and item.portal_type != "Category Navigator"):
            if not recursiveMode:
                results = catalog.searchResults(path = { 'query' : path, 'depth' : 1 }, sort_on = 'getObjPositionInParent')
            else:
                rec_sort_on = 'getObjPositionInParent'
                if is_book:
                    rec_sort_on = 'sortable_title'

                results = catalog.searchResults(path = { 'query' : path}, sort_on = rec_sort_on)

        elif item.portal_type == "Topic":
            if item.limitNumber:
                results = catalog.searchResults(item.buildQuery())[:item.itemCount]
            else:
                results = catalog.searchResults(item.buildQuery())

        elif item.portal_type == "Collection":
            results = item.queryCatalog()

        elif item.portal_type == "Category Navigator" and (hasattr(self.request, 'Subject') or hasattr(self.request, 'Creator')):
            if hasattr(self.request, 'Subject'):
                results = catalog.searchResults(Subject = self.request['Subject'])
            elif hasattr(self.request, 'Creator'):
                results = catalog.searchResults(Creator = self.request['Creator'], portal_type = 'Object')
        else:
            results = []

        resultArray = []

        plone_instance = "/zm"

        #Python to JSON encoding
        if not recursiveMode:
            for res in results:
                obj = res.getObject()
                if self.getMediaURL(obj) != "" and obj != self.context:
                    physical_path = '/'.join(obj.getPhysicalPath())
                    relative_path = physical_path.replace(plone_instance, "")
                    resultArray.append({ "url": res.getURL(), "UID": res["UID"], "relative_path": relative_path, "media": {"type":self.getMediaType(res), "url": self.getMediaURL(res)}, "description": res.Description, "is_object": False })
        else:
            for res in results:

                obj = res.getObject()

                reproduction_reference = ""
                if is_edit_view:
                    reproduction_reference = getattr(obj, 'reproductionData_identification_reproductionReference', "")
                    if not reproduction_reference:
                        reproduction_reference = getattr(obj, 'title', "")

                if self.getMediaURL(obj) != "" and obj != self.context and res.portal_type != 'Folder':
                    media_type = self.getMediaType(res)
                    if media_type == "Image":
                        if obj.image:
                            physical_path = '/'.join(obj.getPhysicalPath())
                            relative_path = physical_path.replace(plone_instance, "")
                            absolute_path = obj.absolute_url()
                            resultArray.append({"url": res.getURL(), "UID": res["UID"], "relative_path": relative_path, "media": {"type":media_type, "url": self.getMediaURL(res)}, "description": res.Description, "is_object": False, "reproduction_reference": reproduction_reference, "absolute_path": absolute_path })

        return resultArray[:]
        
        
    def getMediaURL(self, item):
        """ finds and returns relevant leading media for the given item
        """
        if(self.isVideo(item)):
            return item.absolute_url()
            
        if (item.portal_type == 'Link' or item.portal_type == 'MediaLink') and (item.remoteUrl.find("youtube.com") > -1 or item.remoteUrl.find("vimeo.com") > -1):
            return item.remoteUrl
        
        if item.portal_type == 'Image':
            return item.absolute_url()
        
        #TODO: Added this to avoid the problem with Folders being rendered as images (DELETE THIS WHEN SURE ABOUT THE NEW FIX BELOW)
        #return ""
        
        catalog = getToolByName(self.context, 'portal_catalog')
        plone_utils = getToolByName(self.context, 'plone_utils')
        path = '/'.join(item.getPhysicalPath())
    
        if plone_utils.isStructuralFolder(item):
            results = catalog.searchResults(path = {'query' : path,'depth' : 1 }, type = ['Image', 'File', 'Link'], sort_on = 'getObjPositionInParent')
            if len(results) > 0:
                leadMedia = results[0]
                if leadMedia.portal_type == 'Image':
                    return leadMedia.getURL() + '/@@images/image/large'
                elif (leadMedia.portal_type == 'Link' or leadMedia.portal_type == "MediaLink"):
                    try:
                        return leadMedia.remoteUrl
                    except:
                        return leadMedia.getObject().remoteUrl
                else:
                    return ""
            else:
                #NOTE: Changed this from return leadMedia.getURL() to avoid the problem with Folders being rendered as images
                return ""
        else:
            #TODO: Add lead image support and News Item Image support
            return ""
        
    def isVideo(self, item):
        if FLOWPLAYER_EXISTS:
            result = IFlowPlayable.providedBy(item)
        else:
            result = False
        return result

    def getMediaType(self, obj):
        """ Finds and returns the type of lead media
        """
        item = obj

        try:
            if(self.isVideo(item)):
                return "Video"
            elif (item.portal_type == 'Link' or item.portal_type == "MediaLink") and item.remoteUrl.find("youtube.com") > -1:
                return "Youtube"
            elif (item.portal_type == 'Link' or item.portal_type == "MediaLink") and item.remoteUrl.find("vimeo.com") > -1:
                return "Vimeo"
            else:
                return "Image"
        except:
            if(self.isVideo(item)):
                return "Video"
            elif (item.portal_type == 'Link' or item.portal_type == "MediaLink") and item.getObject().remoteUrl.find("youtube.com") > -1:
                return "Youtube"
            elif (item.portal_type == 'Link' or item.portal_type == "MediaLink") and item.getObject().remoteUrl.find("vimeo.com") > -1:
                return "Vimeo"
            else:
                return "Image"
        return ""

