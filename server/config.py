"""
Application configuration settings

"""
DEBUG = False

SERVICE_ROOT = 'https://cida.usgs.gov'

# URL pattern for retrieving SIFTA cooperator logos
#COOPERATOR_SERVICE_PATTERN = 'https://water.usgs.gov/customer/stories/{site_no}/approved.json'
COOPERATOR_SERVICE_PATTERN = 'https://sifta.water.usgs.gov/Services/REST/Site/CustomerFunding.ashx?SiteNumber={site_no}&StartDate=10/1/2016&EndDate=09/30/2017'