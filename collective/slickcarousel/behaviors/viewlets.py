# -*- coding: utf-8 -*-
from plone.app.layout.viewlets import ViewletBase
from .slideshow import ISlideshow
from plone.app.uuid.utils import uuidToCatalogBrain
from AccessControl import getSecurityManager
from Products.CMFCore.permissions import ModifyPortalContent

class SlickCarouselViewlet(ViewletBase):
    
    """ A simple viewlet that renders the carousel """

    def checkUserPermission(self):
        sm = getSecurityManager()
        if sm.checkPermission(ModifyPortalContent, self.context):
            return True
        return False

    def get_slideshow(self, parent):
        """
        Creates a carousel with the media from parent
        """
        pass

