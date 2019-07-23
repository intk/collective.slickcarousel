# -*- coding: utf-8 -*-
from plone.app.layout.viewlets import ViewletBase
from .slickcarousel import ISlickCarousel
from plone.app.uuid.utils import uuidToCatalogBrain, uuidToObject
from AccessControl import getSecurityManager
from Products.CMFCore.permissions import ModifyPortalContent
from Products.CMFCore.utils import getToolByName
from zope.contentprovider.interfaces import IContentProvider
from zope.component import getMultiAdapter
from plone.event.interfaces import IEvent
from Acquisition import aq_inner, aq_parent
from DateTime import DateTime
import plone.api
import time

from zope.i18nmessageid import MessageFactory
_ = MessageFactory('plonetheme.centraalmuseum')

YEAR_LIMIT = 2024

class SlickCarouselUtils():
    """ A simple viewlet that renders the carousel """

    def isEventPast(self):
        """ Checks if the event is already past """
        event = self.context

        rec = getattr(event, 'recurrence', None)
        if rec:
            return False

        if event.portal_type != 'Event':
            return False
        else:
            try:
                t = DateTime(time.time())
                if event.end is not None:
                    end = DateTime(event.end)
                    return end.year() < t.year() or (end.year() == t.year() and end.month() < t.month()) or(end.year() == t.year() and end.month() == t.month() and end.day() < t.day())
                else:
                    start = DateTime(event.start)
                    return start.year() < t.year() or (start.year() == t.year() and start.month() < t.month()) or(start.year() == t.year() and start.month() == t.month() and start.day() < t.day())
            except:
                return False
        return True

    def hasPresentation(self):
        try:
            if not plone.api.user.is_anonymous():
                if 'presentation' in self.context:
                    return True
            else:
                if 'presentation' in self.context:
                    presentation_folder = self.context['presentation']
                    state = plone.api.content.get_state(obj=presentation_folder)
                    if state != 'published':
                        return False
                    else:
                        return True
                else:
                    return False
        except:
            pass

        return False

    def checkUserPermission(self):
        sm = getSecurityManager()
        if sm.checkPermission(ModifyPortalContent, self.context):
            return True
        return False

    def get_lead_from_contents(self, brain):
        url = None
        img_brain = None
        path = brain.getPath()
        catalog = getToolByName(self.context, "portal_catalog")
        items = catalog(path={"query": path, "depth": 2}, sort_on="getObjPositionInParent", portal_type="Image")

        if items:
            result = items[0]
            img_brain = result
            url = "%s/@@images/image/%s" % (result.getURL(), "large")

        return url, img_brain

    def find_orientation(self, item):
        item_class = ""
        if getattr(item, 'portal_type', '') == "Image":
            image_obj = item.getObject()
            if getattr(image_obj, 'image', None):
                try:
                    w, h = image_obj.image.getImageSize()
                    if w > h:
                        item_class = "%s" %('landscape')
                    else:
                        item_class = "%s" %('portrait')
                except:
                    return item_class

        elif getattr(item, 'hasMedia', False):
            image = uuidToCatalogBrain(item.leadMedia)
            if image:
                image_obj = image.getObject()
                if getattr(image_obj, 'image', None):
                    try:
                        w, h = image_obj.image.getImageSize()
                        if w > h:
                            item_class = "%s" %('landscape')
                        else:
                            item_class = "%s" %('portrait')
                    except:
                        return item_class

        return item_class

    def generate_slide_item_from_brain(self, brain):
        item = {}

        path = brain.getPath()
        url = None
        title = brain.Title
        description = brain.Description
        slide_id = brain.getId
        absoluteurl = brain.getURL()
        item_portal_type = brain.portal_type
        link_image = None
        img_brain = None

        if item_portal_type == "Link":
            # Link
            url = brain.getRemoteUrl
            if getattr(brain, 'leadMedia', None):
                img = uuidToCatalogBrain(brain.leadMedia)
                link_image = "%s/@@images/image/%s" % (img.getURL(), "large")
                img_brain = img
            else:
                link_image, img_brain = self.get_lead_from_contents(brain)
        
        # add case for object
        
        elif item_portal_type != "Image":
            # All content types except Image and Link
            if getattr(brain, 'leadMedia', None):
                img = uuidToCatalogBrain(brain.leadMedia)
                if img:
                    url = "%s/@@images/image/%s" % (img.getURL(), "large")
                    img_brain = img
            else:
                url, img_brain = self.get_lead_from_contents(brain)
        else:
            # Image
            url = "%s/@@images/image/%s" % (brain.getURL(), "large")
            img_brain = brain


        orientation = self.find_orientation(brain)

        item = {
            "type": item_portal_type,
            "url": url,
            "path": path,
            "title": title,
            "description": description,
            "id": slide_id,
            "link_image": link_image,
            "absoluteurl": absoluteurl,
            "orientation": orientation,
            "img_brain": img_brain
        }

        return item

    def generate_slide_from_contentlisting(self, item):
        
        path = item.getPath()
        url = None
        title = item.Title()
        description = item.Description()
        slide_id = item.getId()
        absoluteurl = item.getURL()
        item_portal_type = item.portal_type
        link_image = None
        img_brain = None

        if item_portal_type != "Image":
            # All content types except Image and Link
            if getattr(item, 'leadMedia', None):
                img = uuidToCatalogBrain(item.leadMedia)
                if img:
                    url = "%s/@@images/image/%s" % (img.getURL(), "large")
                    img_brain = img
            else:
                url, img_brain = self.get_lead_from_contents(item)
        else:
            # Image
            url = "%s/@@images/image/%s" % (item.getURL(), "large")
            img_brain = item

        item = {
            "type": item_portal_type,
            "url": url,
            "path": path,
            "title": title,
            "description": description,
            "id": slide_id,
            "link_image": link_image,
            "absoluteurl": absoluteurl,
            "orientation": "landscape",
            "img_brain": img_brain
        }

        return item

    def getLeadImageLink(self):
        try:
            context_uid = self.context.UID()
            brain = uuidToCatalogBrain(context_uid)
            if brain:
                img = uuidToCatalogBrain(getattr(brain, 'leadMedia', None))
                if img:
                    url = "%s/@@images/image/%s" % (img.getURL(), "large")
                    return url
        except:
            raise

        return ""

    def checkObjectOnDisplay(self):
        if self.context.portal_type == "Object":
            try:
                brain = uuidToCatalogBrain(self.context.UID())
                return brain.object_on_display
            except:
                return False
        else:
            return False

    def formatted_date(self):
        item = self.context
        provider = getMultiAdapter(
            (self.context, self.request, self),
            IContentProvider, name='formatted_date'
        )

        rec = getattr(item, 'recurrence', None)
        if rec:
            if "FREQ=DAILY" in rec:
                return self.context.translate(_("DAILY"))
            elif "FREQ=MONDAYFRIDAY" in rec:
                return self.context.translate(_("MONDAYFRIDAY"))
            elif "FREQ=WEEKDAYS" in rec:
                return self.context.translate(_("WEEKDAYS"))
            elif "FREQ=WEEKLY" in rec:
                return self.context.translate(_("WEEKLY"))
            elif "FREQ=MONTHLY" in rec:
                return self.context.translate(_("MONTHLY"))
            elif "FREQ=YEARLY" in rec:
                return self.context.translate(_("YEARLY"))
            else:
                return provider(item)
        else:
            end_date = getattr(item, 'end', None)
            if end_date:
                end = DateTime(end_date)
                if end.year() > YEAR_LIMIT:
                    return self.context.translate(_("permanent_collection"))
                else:
                    return provider(item)
            else:
                return provider(item)

    def get_items(self):

        result = []

        portal_type = getattr(self.context, 'portal_type', None)

        current_context = self.context
        if portal_type == "Occurrence":
            current_context = aq_parent(aq_inner(self.context))

        collection_id = self.request.get('collection_id', None)
        b_start = self.request.get('b_start', None)
        try:
            b_start = int(b_start)
        except:
            b_start = 0

        if collection_id and portal_type in ['Object']:
            collection = uuidToObject(collection_id)
            objects = collection.queryCatalog(batch=True, b_start=int(b_start), b_size=25)
            for content_item in objects._sequence:
                new_item = self.generate_slide_from_contentlisting(content_item)
                if new_item['url']:
                    result.append(new_item)

            return {'items': result, 'has_presentation': False}

        elif portal_type in ['Collection', 'Folder']:
            brain = uuidToCatalogBrain(current_context.UID())
            if getattr(brain, 'leadMedia', None):
                img_uid = brain.leadMedia
                img = uuidToCatalogBrain(img_uid)
                if img:
                    slide_item = self.generate_slide_item_from_brain(img)
                    result.append(slide_item)
                
                return {'items': result, 'has_presentation': False}
            else:
                return {'items': result, 'has_presentation': False}

        elif self.context.get('slideshow', None):

            # Get items inside of slideshow
            slideshow = current_context['slideshow']
            catalog = getToolByName(current_context, "portal_catalog")
            slideshow_path = "/".join(slideshow.getPhysicalPath())
            items = catalog(path={"query": slideshow_path, "depth": 1}, sort_on="getObjPositionInParent")
            for brain in items:
                slide_item = None
                if brain.portal_type == "Link":
                    slide_item = self.generate_slide_item_from_brain(brain)
                    #result.append(slide_item)
                elif getattr(brain, 'leadMedia', None) and brain.portal_type != "Image":
                    slide_item = self.generate_slide_item_from_brain(brain)
                elif brain.portal_type == "Image":
                    slide_item = self.generate_slide_item_from_brain(brain)

                if slide_item:
                    if slide_item['url'] != None:
                        result.append(slide_item)

            if portal_type in ['Event']:
                is_event_in_the_past = self.isEventPast()
                event_has_presentation = self.hasPresentation()
                
                if event_has_presentation and not is_event_in_the_past:
                    if len(result) > 0:
                        return {'items': [result[0]], 'has_presentation': True}
                    else:
                        return {'items': result, 'has_presentation': False}

                elif event_has_presentation and is_event_in_the_past:
                    # Get images in the archive
                    if self.context.get('archive', None):
                        # Get items inside of archive
                        archive_items = current_context['archive']
                        catalog = getToolByName(current_context, "portal_catalog")
                        archive_path = "/".join(archive_items.getPhysicalPath())
                        items = catalog(path={"query": archive_path, "depth": 1}, sort_on="getObjPositionInParent")
                        for brain in items:
                            slide_item = None
                            if brain.portal_type == "Link":
                                slide_item = self.generate_slide_item_from_brain(brain)
                                #result.append(slide_item)
                            elif getattr(brain, 'leadMedia', None) and brain.portal_type != "Image":
                                slide_item = self.generate_slide_item_from_brain(brain)
                            elif brain.portal_type == "Image":
                                slide_item = self.generate_slide_item_from_brain(brain)

                            if slide_item:
                                if slide_item['url'] != None:
                                    result.append(slide_item)

                        return {'items': result, 'has_presentation': True}
                    else:
                        return {'items': result, 'has_presentation': True}
                else:
                    # Get images in the archive
                    if self.context.get('archive', None):
                        # Get items inside of archive
                        archive_items = current_context['archive']
                        catalog = getToolByName(current_context, "portal_catalog")
                        archive_path = "/".join(archive_items.getPhysicalPath())
                        items = catalog(path={"query": archive_path, "depth": 1}, sort_on="getObjPositionInParent")
                        for brain in items:
                            slide_item = None
                            if brain.portal_type == "Link":
                                slide_item = self.generate_slide_item_from_brain(brain)
                                #result.append(slide_item)
                            elif getattr(brain, 'leadMedia', None) and brain.portal_type != "Image":
                                slide_item = self.generate_slide_item_from_brain(brain)
                            elif brain.portal_type == "Image":
                                slide_item = self.generate_slide_item_from_brain(brain)

                            if slide_item:
                                if slide_item['url'] != None:
                                    result.append(slide_item)

                        return {'items': result, 'has_presentation': False}
                    else:
                        return {'items': result, 'has_presentation': False}

            return {'items': result, 'has_presentation': False}
        else:
            return {'items': result, 'has_presentation': False}

        return {'items': result, 'has_presentation': False}

class SlickCarouselViewlet(ViewletBase, SlickCarouselUtils):
    
    """ A simple viewlet that renders the carousel """

    pass

