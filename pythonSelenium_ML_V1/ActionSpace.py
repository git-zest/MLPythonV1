from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException,  \
    ElementNotVisibleException
import os
import globalvariable

class ActionSpace(object):
    def __init__(self, driver=None):
        self.driver = driver
        self.available_actions = [
            #self.objectidproperty,
            self.objectnameproperty,
            #self.objectclassproperty,
            #self.objectxpath_idandclassproperty,
            self.objectxpath_nameandclassprop,
            self.objectplaceholderproperty,
            self.objectarialabelproperty,
            self.objecttitleproperty,
            self.objecttabindexproperty,
            self.objectroleproperty,
            self.objectaccesskeyproperty
        ]
        self.number_of_actions = len(self.available_actions)

    def objectidproperty(self,intrawcount):
        x = 0
        rawdata=globalvariable.rawData
        driver = globalvariable.webDriver
        print(rawdata)
        print("action space", intrawcount)
        if 'id' in str(rawdata[intrawcount-1]):
            try:
                locator = rawdata[intrawcount-1]['id']
                print(locator)
                id_property = driver.find_element_by_id(locator)
                print(id_property)
                id_property.click()
                x = 1
                return 1, locator, "id"
            except:
                return 0, "", ""
        else:
            return 0, "", ""

    def objectnameproperty(self, intrawcount):
        #print('values')
        x = 0
        rawdata = globalvariable.rawData
        print("action space", intrawcount)
        #print(rawdata[globalvariable.intrawdata])
        driver = globalvariable.webDriver
        print(rawdata)
        #print(driver)
        #print("name property", rawdata[globalvariable.intrawdata])
        #print('name' in str(rawdata[globalvariable.intrawdata]))
        if 'name' in str(rawdata[intrawcount-1]):
            try:
                locator = rawdata[intrawcount-1]['name']
                print(locator)
                id_property = driver.find_element_by_name(locator)
                print(id_property)
                id_property.click()
                return 1, locator, "name"
            except:
                return 0, "", ""
        else:
            return 0, "", ""

    def objectclassproperty(self, intrawcount):
        rawdata = globalvariable.rawData
        driver = globalvariable.webDriver
        print("action space", intrawcount)
        print(rawdata)
        if 'class' in str(rawdata[intrawcount-1]):
            try:
                locator = rawdata[intrawcount-1]['class']
                print(locator)
                id_property = driver.find_element_by_class_name(locator)
                print(id_property)
                id_property.click()
                return 1, locator
            except:
                return 0, ""
        else:
            return 0, "", ""

    def objectxpath_idandclassproperty(self,intrawcount):
        rawdata = globalvariable.rawData
        driver = globalvariable.webDriver
        print("action space", intrawcount-1)
        print(rawdata)
        if ('class' in rawdata[intrawcount-1]) and ('id' in rawdata[intrawcount-1]):
            try:
                locator = "//input[@id='" + rawdata[intrawcount-1]['id'] + "' and  @class='" + rawdata[intrawcount-1]['class'] + "']"
                print(locator)
                id_property = driver.find_element_by_xpath(locator)
                print(id_property)
                id_property.click()
                return 1, locator, "xpath"
            except:
                return 0, "", ""
        else:
            return 0, "", ""

    def objectxpath_nameandclassprop(self,intrawcount):
        rawdata = globalvariable.rawData
        driver = globalvariable.webDriver
        print(rawdata)
        print("action space", intrawcount)
        if ('name' in str(rawdata[intrawcount-1])) and ('id' in str(rawdata[intrawcount-1])):
            try:
                locator = "//input[@name='" + rawdata[intrawcount-1]['name'] + "' and  @class='" + rawdata[intrawcount-1]['class'] + "']"
                print(locator)
                id_property = driver.find_element_by_xpath(locator)
                print(id_property)
                id_property.click()
                return 1, locator, "xpath"
            except:
                return 0, "", ""
        else:
            return 0, "", ""

    def objectplaceholderproperty(self, intrawcount):
        rawdata = globalvariable.rawData
        driver = globalvariable.webDriver
        print("action space", intrawcount)
        print(rawdata)
        if 'placeholder' in str(rawdata[intrawcount-1]):
            try:
                locator = "//input[@placeholder='" + rawdata[intrawcount-1]['placeholder'] + "']"
                print(locator)
                id_property = driver.find_element_by_xpath(locator)
                print(id_property)
                id_property.click()
                return 1, locator, "xpath"
            except:
                return 0, "", ""
        else:
            return 0, "", ""

    def objectarialabelproperty(self, intrawcount):
        rawdata = globalvariable.rawData
        driver = globalvariable.webDriver
        print("action space", intrawcount)
        print(rawdata)
        if 'aria-label' in str(rawdata[intrawcount-1]):
            try:
                locator = "//input[@aria-label='" + rawdata[intrawcount-1]['aria-label'] + "']"
                print(locator)
                id_property = driver.find_element_by_xpath(locator)
                print(id_property)
                id_property.click()
                return 1, locator, "xpath"
            except:
                return 0, "", ""
        else:
            return 0, "", ""

    def objecttitleproperty(self, intrawcount):
        rawdata = globalvariable.rawData
        driver = globalvariable.webDriver
        print("action space", intrawcount)
        print(rawdata)
        if 'title' in str(rawdata[intrawcount-1]):
            try:
                locator = "//input[@title='" + rawdata[intrawcount-1]['title'] + "']"
                print(locator)
                id_property = driver.find_element_by_xpath(locator)
                print(id_property)
                id_property.click()
                return 1, locator, "xpath"
            except:
                return 0, "", ""
        else:
            return 0, "", ""

    def objecttabindexproperty(self, intrawcount):
        rawdata = globalvariable.rawData
        driver = globalvariable.webDriver
        print("action space", intrawcount)
        print(rawdata)
        if 'tabindex' in str(rawdata[intrawcount-1]):
            try:
                locator = "//input[@tabindex='" + rawdata[intrawcount-1]['tabindex'] + "']"
                print(locator)
                id_property = driver.find_element_by_xpath(locator)
                print(id_property)
                id_property.click()
                return 1, locator, "xpath"
            except:
                return 0, "", ""
        else:
            return 0, "", ""

    def objectroleproperty(self, intrawcount):
        rawdata = globalvariable.rawData
        driver = globalvariable.webDriver
        print("action space", intrawcount)
        print(rawdata)
        if 'role' in str(rawdata[intrawcount-1]):
            try:
                locator = "//input[@role='" + rawdata[intrawcount-1]['role'] + "']"
                print(locator)
                id_property = driver.find_element_by_xpath(locator)
                print(id_property)
                id_property.click()
                return 1, locator, "xpath"
            except:
                return 0, "", ""
        else:
            return 0, "", ""

    def objectaccesskeyproperty(self, intrawcount):
        rawdata = globalvariable.rawData
        driver = globalvariable.webDriver
        print("action space", intrawcount)
        print(rawdata)
        if 'accesskey' in str(rawdata[intrawcount-1]):
            try:
                locator = "//input[@accesskey='" + rawdata[intrawcount-1]['accesskey'] + "']"
                print(locator)
                id_property = driver.find_element_by_xpath(locator)
                #print(id_property)
                id_property.click()
                return 1, locator, "xpath"
            except:
                return 0, "", ""
        else:
            return 0, "", ""


