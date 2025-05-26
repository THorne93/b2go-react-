/* eslint-disable import/no-anonymous-default-export */
import { notification } from 'antd';
import axios from 'axios';

const URL = process.env.REACT_APP_URL_API;
console.log("API Base URL:", URL); // Debug

class Service {
  constructor(api_url) {
    this.baseUrl = api_url;
  }

  get = async (url, params = null) => {
    try {
      var config = {
        method: 'get',
        url: this.baseUrl + url,
        headers: { 'Authorization': 'Basic ', 'Content-Type': 'application/json' },
        params
      };
      return await axios(config)
    } catch (err) { notification["error"]({ message: err.response.data }); }
  }

  post = async (url, data) => {
    try {
      var config = {
        method: 'post',
        url: this.baseUrl + url,
        headers: { 'Authorization': 'Basic ', 'Content-Type': 'application/json' },
        data: data
      };
      return await axios(config)
    } catch (err) { notification["error"]({ message: err.response.data }); }
  }

  put = async (url, data) => {
    try {
      var config = {
        method: 'put',
        url: this.baseUrl + url,
        headers: { 'Authorization': 'Basic ', 'Content-Type': 'application/json' },
        data: data
      };
      return await axios(config)
    } catch (err) { notification["error"]({ message: err.response.data }); }
  }

  del = async (url) => {
    try {
      var config = {
        method: 'delete',
        url: this.baseUrl + url,
        headers: { 'Authorization': 'Basic ', 'Content-Type': 'application/json' }
      };
      return await axios(config)
    } catch (err) { notification["error"]({ message: err.response.data }); }
  }

  getFile = async (url) => {
    try {
      var config = {
        url: this.baseUrl + url,
        method: 'GET',
        responseType: 'blob',
        headers: { 'Authorization': 'Basic ', 'Content-Type': 'application/json' }
      };
      return await axios(config)
    } catch (err) { notification["error"]({ message: err.response.data }); }
  }

  files = async (url, data) => {
    try {
      var config = {
        method: 'post',
        url: this.baseUrl + url,
        responseType: 'blob',
        headers: { 'Authorization': 'Basic ', 'Content-Type': 'application/json' },
        data
      };
      return await axios(config)
    } catch (err) { notification["error"]({ message: err.response.data }); }
  }
}

export default new Service(URL);