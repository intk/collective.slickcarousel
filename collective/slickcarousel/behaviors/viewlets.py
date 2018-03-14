# -*- coding: utf-8 -*-
from plone.app.layout.viewlets import ViewletBase
from .slickcarousel import ISlickCarousel
from plone.app.uuid.utils import uuidToCatalogBrain, uuidToObject
from AccessControl import getSecurityManager
from Products.CMFCore.permissions import ModifyPortalContent
from Products.CMFCore.utils import getToolByName


class SlickCarouselUtils():
    """ A simple viewlet that renders the carousel """

    def checkUserPermission(self):
        sm = getSecurityManager()
        if sm.checkPermission(ModifyPortalContent, self.context):
            return True
        return False

    def get_lead_from_contents(self, brain):
        url = None

        path = brain.getPath()
        catalog = getToolByName(self.context, "portal_catalog")
        items = catalog(path={"query": path, "depth": 2}, sort_on="getObjPositionInParent", portal_type="Image")

        if items:
            result = items[0]
            return "%s/@@images/image/%s" % (result.getURL(), "large")

        return url

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

        if item_portal_type == "Link":
            # Link
            url = brain.getRemoteUrl
            if getattr(brain, 'leadMedia', None):
                img = uuidToCatalogBrain(brain.leadMedia)
                link_image = "%s/@@images/image/%s" % (img.getURL(), "large")
            else:
                link_image = self.get_lead_from_contents(brain)
        
        # add case for object

        elif item_portal_type != "Image":
            # All content types except Image and Link
            if getattr(brain, 'leadMedia', None):
                img = uuidToCatalogBrain(brain.leadMedia)
                if img:
                    url = "%s/@@images/image/%s" % (img.getURL(), "large")
            else:
                url = self.get_lead_from_contents(brain)
        else:
            # Image
            url = "%s/@@images/image/%s" % (brain.getURL(), "large")

        item = {
            "type": item_portal_type,
            "url": url,
            "path": path,
            "title": title,
            "description": description,
            "id": slide_id,
            "link_image": link_image,
            "absoluteurl": absoluteurl
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

        if item_portal_type != "Image":
            # All content types except Image and Link
            if getattr(item, 'leadMedia', None):
                img = uuidToCatalogBrain(item.leadMedia)
                if img:
                    url = "%s/@@images/image/%s" % (img.getURL(), "large")
            else:
                url = self.get_lead_from_contents(item)
        else:
            # Image
            url = "%s/@@images/image/%s" % (item.getURL(), "large")

        item = {
            "type": item_portal_type,
            "url": url,
            "path": path,
            "title": title,
            "description": description,
            "id": slide_id,
            "link_image": link_image,
            "absoluteurl": absoluteurl
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

    def get_items(self):
        result = []

        portal_type = getattr(self.context, 'portal_type', None)

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

            return result

        elif portal_type in ['Collection', 'Folder']:
            brain = uuidToCatalogBrain(self.context.UID())
            if getattr(brain, 'leadMedia', None):
                img_uid = brain.leadMedia
                img = uuidToCatalogBrain(img_uid)
                if img:
                    slide_item = self.generate_slide_item_from_brain(img)
                    result.append(slide_item)
                return result
            else:
                return result

        elif self.context.get('slideshow', None):
            # Get items inside of slideshow
            slideshow = self.context['slideshow']
            catalog = getToolByName(self.context, "portal_catalog")
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

            return result
        else:
            return result

        return result

class SlickCarouselViewlet(ViewletBase, SlickCarouselUtils):
    
    """ A simple viewlet that renders the carousel """

    pass

