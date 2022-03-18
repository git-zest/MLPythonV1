from gym import Env
from gym.spaces import Discrete, Box
import numpy as np
import random
from selenium import webdriver
from io import BytesIO
import tarfile
import time
import os
import requests
import json
from pymongo import MongoClient
import matplotlib.pyplot as plt
import globalvariable

from pathlib import Path
from time import sleep
import re
from bs4 import BeautifulSoup
from selenium import webdriver
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten, Conv2D
from tensorflow.keras.optimizers import Adam

from rl.agents import DQNAgent
from rl.policy import BoltzmannQPolicy
from rl.memory import SequentialMemory
from itertools import islice
import requests
import csv
import linecache
from timeit import default_timer as timer
from datetime import *
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, ElementNotInteractableException, ElementNotVisibleException
import os
from ActionsExist import ActionsExist
import ActionsExist
import gym
import torch

from torch.autograd import Variable
import random
import numpy as np

class seleniumenvexist(Env):
    def __init__(self, intrawcount,sr_screenname,vr_urlparam,vr_existscreennamefun):
        self.vr_urlparam=vr_urlparam
        self.sr_screenname=sr_screenname
        self.action_space = Discrete(8)
        self.intrawcount = len(globalvariable.rawData)
        self.vr_existscreennamefun= vr_existscreennamefun
        self.observation_space = Box(low=i, high=i, shape=(2,), dtype=int)
        self.state_action = np.zeros([intrawcount])
        self.driver = globalvariable.webDriver


    def step(self, action_index):
        act=ActionsExist.ActionsExist(self.driver)
        available_actions = [
            # self.objectidproperty,
            act.objectaccesskeyproperty,
            act.objectnameproperty,
            # self.objectclassproperty,
            # self.objectxpath_idandclassproperty,
            act.objectxpath_nameandclassprop,
            act.objectplaceholderproperty,
            act.objectarialabelproperty,
            act.objecttitleproperty,
            act.objecttabindexproperty,
            act.objectroleproperty,

        ]
        print('state and action', self.intrawcount)
        int_avail_act, locator, locatordescription = available_actions[action_index](self.intrawcount)
        print('state and action', self.state_action)
        stateaction = self.state_action
        print(action_index)
        print('state action values', stateaction)
        done, reward = self.determine_reward(int_avail_act)
        if done:
            print('action value index', self.intrawcount)
            self.create_collection(self.sr_screenname,"input",locator, str(rawdata[self.intrawcount-1]), locatordescription, self.vr_existscreennamefun)
        return stateaction, done, reward, {}

    def render(self):
        pass

    def determine_reward(self, reward):
        done = False
        if(reward==1):
            done= True
            reward = 1
        else:
            done = False
            reward = 0
        return done, reward

    def reset(self):
        self.driver.maximize_window()
        window_size = self.driver.get_window_size()
        print(window_size)
        window_position = self.driver.get_window_position()
        print(window_position)
        mouse_position_x = (window_size["width"] + window_position["x"]) / 2
        mouse_position_y = (window_size["height"] + window_position["y"]) / 2 + 25
        #self.state
        state_action = self.observation_space
        return state_action.sample()

    def clean(self):
        print('Cleaning up Selenium driver and docker container')
        #self.driver and self.driver.quit()

    def create_driver_exist(self):
        #from selenium.webdriver.remote.webdriver import WebDriver as RemoteWebDriver
        print('Cleaning up Selenium driver and docker container')
        print(globalvariable.webdriver_url)
        driver = webdriver.Remote(command_executor=globalvariable.webdriver_url, desired_capabilities={})
        driver.session_id = globalvariable.webdriver_id
        driver.implicitly_wait(10)
        print(globalvariable.webDriver)
        return globalvariable.webDriver

    def connect_driver(self):
        pass


    def filter_attribute(self,soup):
        # Funtion to filter the element
        # Regex pattern for style
        removeStyle = re.compile(r"display", re.IGNORECASE)
        for input_style in soup.findAll("input", {'style': removeStyle}):
            input_style.decompose()
        # filter type attribute
        removeType = re.compile(r"submit|radio|hidden|checkbox|file|button|image",
                                re.IGNORECASE)
        for input_type in soup.findAll("input", attrs=({"type": removeType})):
            input_type.decompose()

        for input_hidden in soup.find_all("input", {'hidden': 'hidden'}):
            input_hidden.decompose()

        # remove readonly attribute
        for readonly in soup.find_all("input"):
            if readonly.has_attr('readonly'):
                readonly.decompose()
        # Regex pattern for login filter
        removePattern = re.compile(
            r"(login|hidden|submit|captcha)",
            re.IGNORECASE)
        # Decompose all elements which have login pattern
        for class_login in soup.find_all("input", attrs={'class': removePattern}):
            class_login.decompose()
        for id_login in soup.find_all("input", attrs={'id': removePattern}):
            id_login.decompose()
        for name_login in soup.find_all("input", attrs={'name': removePattern}):
            name_login.decompose()
        for label_login in soup.find_all("input", attrs={'aria-label': removePattern}):
            label_login.decompose()
        for placeholder_login in soup.find_all("input", attrs={'placeholder': removePattern}):
            placeholder_login.decompose()
        for placeholder_login in soup.find_all("input", attrs={'autocomplete': removePattern}):
            placeholder_login.decompose()

    def scrapeTestingApp(self,driver):
        soup = BeautifulSoup(driver.page_source, 'lxml')
        type_search = soup.findAll("input")
        self.filter_attribute(soup)
        raw_data = soup.findAll("input")
        return raw_data

    def create_collection(self,collection_name,obj_type,obj_parameter,obj_tag,object_identification,vr_existscreennamefun):
        print(collection_name)
        print(vr_existscreennamefun)
        url = "http://localhost:8082/api/genericfunctioncreate?parm1="+collection_name+"&parm2="+obj_type+"&parm3="+obj_parameter+"&parm4="+obj_tag+"&parm5="+object_identification+"&parm6="+vr_existscreennamefun

        payload = "{\"query\":\"\",\"variables\":{}}"
        response = requests.request("POST", url, data=payload)
        print(response.text)


    def get_collection(self,collection_name):
        print(collection_name)
        print(vr_existscreennamefun)
        url = "http://localhost:8082/api/genericfunctioncreate?parm1="+collection_name+"&parm2="+obj_type+"&parm3="+obj_parameter+"&parm4="+obj_tag+"&parm5="+object_identification+"&parm6="+vr_existscreennamefun

        payload = "{\"query\":\"\",\"variables\":{}}"
        response = requests.request("POST", url, data=payload)
        print(response.text)

class webscapetesting(object):
    def filter_attribute(self,soup):
        # Funtion to filter the element
        # Regex pattern for style
        removeStyle = re.compile(r"display", re.IGNORECASE)
        for input_style in soup.findAll("input", {'style': removeStyle}):
            input_style.decompose()
        # filter type attribute
        removeType = re.compile(r"submit|radio|hidden|checkbox|file|button|image",
                                re.IGNORECASE)
        for input_type in soup.findAll("input", attrs=({"type": removeType})):
            input_type.decompose()

        for input_hidden in soup.find_all("input", {'hidden': 'hidden'}):
            input_hidden.decompose()

        # remove readonly attribute
        for readonly in soup.find_all("input"):
            if readonly.has_attr('readonly'):
                readonly.decompose()
        # Regex pattern for login filter
        removePattern = re.compile(
            r"(login|hidden|submit|captcha)",
            re.IGNORECASE)
        # Decompose all elements which have login pattern
        for class_login in soup.find_all("input", attrs={'class': removePattern}):
            class_login.decompose()
        for id_login in soup.find_all("input", attrs={'id': removePattern}):
            id_login.decompose()
        for name_login in soup.find_all("input", attrs={'name': removePattern}):
            name_login.decompose()
        for label_login in soup.find_all("input", attrs={'aria-label': removePattern}):
            label_login.decompose()
        for placeholder_login in soup.find_all("input", attrs={'placeholder': removePattern}):
            placeholder_login.decompose()
        for placeholder_login in soup.find_all("input", attrs={'autocomplete': removePattern}):
            placeholder_login.decompose()

    def scrapeTestingApp(self,driver_id,sr_urlname):
        #WebDriver.execute = new_command_execute
        driver = webdriver.Remote(command_executor=sr_urlname, desired_capabilities={})
        driver.session_id = driver_id
        driver.implicitly_wait(10)
        globalvariable.webDriver=driver
        driver.find_element_by_name("firstname").send_keys("selenium")
        soup = BeautifulSoup(driver.page_source, 'lxml')
        type_search = soup.findAll("input")
        self.filter_attribute(soup)
        raw_data = soup.findAll("input")
        #driver.quit()
        print(raw_data)
        return raw_data

    def scrapeexistingTestingApp(self):
        option = webdriver.ChromeOptions()
        driver = webdriver.Chrome(chrome_options=option)
        driver.get("https://www.facebook.com/")
        driver.implicitly_wait(10)
        soup = BeautifulSoup(driver.page_source, 'lxml')
        type_search = soup.findAll("input")
        self.filter_attribute(soup)
        raw_data = soup.findAll("input")
        driver.quit()
        return raw_data



def build_model(states, actions):
    model = Sequential()
    model.add(Dense(32, activation='relu', input_shape = states))
    #model.add(Dense(32, activation='relu'))
    model.add(Dense(actions, activation='linear'))
    return model

def build_agent(model, actions):
    policy = BoltzmannQPolicy()
    memory = SequentialMemory(limit=50000, window_length=1)
    dqn = DQNAgent(model=model, memory=memory, policy=policy,
                  nb_actions=actions, nb_steps_warmup=10, target_model_update=1e-2)
    return dqn




class DQN():
    def __init__(self, n_state, n_action, n_hidden=50, lr=0.05):
        self.criterion = torch.nn.MSELoss()
        self.model = torch.nn.Sequential(
                        torch.nn.Linear(n_state, n_hidden),
                        torch.nn.ReLU(),
                        torch.nn.Linear(n_hidden, n_action)
                )
        self.optimizer = torch.optim.Adam(self.model.parameters(), lr)


    def update(self, s, y):
        """
        Update the weights of the DQN given a training sample
        @param s: state
        @param y: target value
        """
        print('state value', s)
        print('y state value', y)
        y_pred = self.model(torch.Tensor(s))
        loss = self.criterion(y_pred, Variable(torch.Tensor(y)))
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()


    def predict(self, s):
        """
        Compute the Q values of the state for all actions using the learning model
        @param s: input state
        @return: Q values of the state for all actions
        """
        print('state valuess next ', s)
        with torch.no_grad():
            return self.model(torch.Tensor(s))



def gen_epsilon_greedy_policy(estimator, epsilon, n_action):
    def policy_function(state):
        print('gen epsilon greedy policy', state)
        print(random.random())
        if random.random() < epsilon:
            return random.randint(0, n_action - 1)
        else:
            q_values = estimator.predict(state)
            print('testing', torch.argmax(q_values).item())
            return torch.argmax(q_values).item()
    return policy_function


def q_learning(env, estimator, n_episode, gamma=1.0, epsilon=0.1, epsilon_decay=.99):
    """
    Deep Q-Learning using DQN
    @param env: Gym environment
    @param estimator: DQN object
    @param n_episode: number of episodes
    @param gamma: the discount factor
    @param epsilon: parameter for epsilon_greedy
    @param epsilon_decay: epsilon decreasing factor
    """
    state = env.reset()
    for episode in range(n_episode):
        policy = gen_epsilon_greedy_policy(estimator, epsilon, n_action)
        print('state in for loop episode', state)
        is_done = False
        while not is_done:
            action = policy(state)
            next_state, reward, is_done, _ = env.step(action)
            total_reward_episode[episode] += reward
            print('next state', next_state)
            modified_reward = 0
            print('reward next state', next_state)
            print('state values to predict', state)
            q_values = estimator.predict(state).tolist()
            print('q values', q_values)
            if is_done:
                q_values[action] = modified_reward
                estimator.update(state, q_values)
                break
            q_values_next = estimator.predict(state)
            print('q values next', q_values_next)
            q_values[action] = modified_reward + gamma * torch.max(q_values_next).item()
            print('q values', q_values)
            estimator.update(state, q_values)
        if is_done:
            #globalvariable.webDriver.quit()
            break
            #state = next_state
        if episode==10:
            #globalvariable.webDriver.quit()
            break

        print('Episode: {}, total reward: {}, epsilon: {}'.format(episode, total_reward_episode[episode], epsilon))

        epsilon = max(epsilon * epsilon_decay, 0.01)


vr_screenname = sys.argv[1]
vr_urlparam = sys.argv[2]
vr_existscreennamefun = sys.argv[3]
vr_driverid=sys.argv[4]
globalvariable.webdriver_url=vr_urlparam
globalvariable.webdriver_id=vr_driverid
scrape = webscapetesting()
rawdata = scrape.scrapeTestingApp(vr_driverid,vr_urlparam)
globalvariable.rawData=rawdata
print("raw data length",len(rawdata))
for i in range(len(rawdata)):
    print('new state to be actioned', i)
    print('==================================================================================')
    print('==================================================================================')
    print('==================================================================================')
    print('==================================================================================')
    env = seleniumenvexist(i,vr_screenname,vr_urlparam,vr_existscreennamefun)
    observationspace = Box(low=i, high=i, shape=(2,), dtype=int)
    n_state = observationspace.shape[0]
    actions = env.action_space.n
    print("changes", env.observation_space.sample())
    #n_state = env.observation_space.shape[0]
    print(n_state)
    n_action = env.action_space.n
    print(n_action)
    n_hidden = 8
    lr = 0.001
    dqn = DQN(n_state, n_action, n_hidden, lr)
    n_episode = 10
    total_reward_episode = [0] * n_episode
    q_learning(env, dqn, n_episode, gamma=.99, epsilon=.3)
    plt.plot(total_reward_episode)
    plt.title('Episode reward over time')
    plt.xlabel('Episode')
    plt.ylabel('Total reward')
    plt.show()
