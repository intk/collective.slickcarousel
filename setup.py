from setuptools import setup, find_packages
import os

version = '0.1'

setup(name='collective.slickcarousel',
      version=version,
      description="Adds a carousel to any dexterity folderish type.",
      long_description=open("README.rst").read(),
      classifiers=[
        "Environment :: Web Environment",
        "Framework :: Plone",
        "Framework :: Plone :: 5.0",
        "Programming Language :: Python",
        "Programming Language :: Python :: 2.7",
        "Operating System :: OS Independent",
        "License :: OSI Approved :: GNU General Public License v2 (GPLv2)",
        ],
      keywords='Plone',
      author='Andre Goncalves',
      author_email='andre@intk.com',
      url='https://github.com/intk/collective.slickcarousel',
      download_url='https://github.com/intk/collective.slickcarousel/tarball/0.1',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['collective'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          # -*- Extra requirements: -*-
      ],
      entry_points="""
      # -*- Entry points: -*-

      [z3c.autoinclude.plugin]
      target = plone
      """,
      setup_requires=["PasteScript"],
      paster_plugins=["ZopeSkel"],
      )
