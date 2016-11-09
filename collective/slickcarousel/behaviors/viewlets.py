# -*- coding: utf-8 -*-
from plone.app.layout.viewlets import ViewletBase
from .slickcarousel import ISlickCarousel
from plone.app.uuid.utils import uuidToCatalogBrain
from AccessControl import getSecurityManager
from Products.CMFCore.permissions import ModifyPortalContent
from Products.CMFCore.utils import getToolByName

class SlickCarouselViewlet(ViewletBase):
    
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
            return result.getURL()

        return url

    def generate_slide_item_from_brain(self, brain):
        item = {}

        path = brain.getPath()
        url = None
        title = brain.Title
        description = brain.Description
        slide_id = brain.getId
        item_portal_type = brain.portal_type
        link_image = None

        if item_portal_type == "Link":
            # Link
            url = brain.getRemoteUrl
            if getattr(brain, 'leadMedia', None):
                img = uuidToCatalogBrain(brain.leadMedia)
                link_image = img.getURL()
            else:
                link_image = self.get_lead_from_contents(brain)

        elif item_portal_type != "Image":
            # All content types except Image and Link
            if getattr(brain, 'leadMedia', None):
                img = uuidToCatalogBrain(brain.leadMedia)
                url = img.getURL()
            else:
                url = self.get_lead_from_contents(brain)
        else:
            # Image
            url = brain.getURL()

        item = {
            "type": item_portal_type,
            "url": url,
            "path": path,
            "title": title,
            "description": description,
            "id": slide_id,
            "link_image": link_image
        }

        return item

    def get_items(self):
        result = []

        portal_type = getattr(self.context, 'portal_type', None)

        if portal_type in ['Collection', 'Folder']:
            if getattr(brain, 'leadMedia', None):
                img = uuidToCatalogBrain(brain.leadMedia)
                slide_item = self.generate_slide_item_from_brain(brain)
                result.append(slide_item)

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
                    #result.append(slide_item)
                elif brain.portal_type == "Image":
                    slide_item = self.generate_slide_item_from_brain(brain)
                    #result.append(slide_item)

                if slide_item:
                    if slide_item['url'] != None:
                        result.append(slide_item)

            return result
        else:
            return result

