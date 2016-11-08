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

    def get_items(self):
        result = []
        # Check if slideshow exists
        if self.context.get('slideshow', None):
            # Get items inside of slideshow
            slideshow = self.context['slideshow']
            catalog = getToolByName(self.context, "portal_catalog")
            slideshow_path = "/".join(slideshow.getPhysicalPath())
            items = catalog(path={"query": slideshow_path, "depth": 1}, sort_on="getObjPositionInParent")
            for brain in items:
                if getattr(brain, 'leadMedia', None) and brain.portal_type != "Image":
                    img = uuidToCatalogBrain(brain.leadMedia)
                    result.append({"url": img.getURL()})
                elif brain.portal_type == "Image":
                    result.append({"url": brain.getURL()})
            return result
        else:
            return result

