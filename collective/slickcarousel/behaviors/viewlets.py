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

    def generate_slide_item_from_brain(self, brain):
        item = {}

        path = brain.getPath()
        url = brain.getURL()
        title = brain.Title
        description = brain.Description
        slide_id = brain.getId
        item_portal_type = brain.portal_type

        if item_portal_type == "Link":
            url = brain.getRemoteUrl

        item = {
            "type": item_portal_type,
            "url": url,
            "path": path,
            "title": title,
            "description": description,
            "id": slide_id
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
                if getattr(brain, 'leadMedia', None) and brain.portal_type != "Image":
                    img = uuidToCatalogBrain(brain.leadMedia)
                    slide_item = self.generate_slide_item_from_brain(brain)
                    result.append(slide_item)
                elif brain.portal_type == "Link":
                    slide_item = self.generate_slide_item_from_brain(brain)
                    result.append(slide_item)
                elif brain.portal_type == "Image":
                    slide_item = self.generate_slide_item_from_brain(brain)
                    result.append(slide_item)
            return result
        else:
            return result

