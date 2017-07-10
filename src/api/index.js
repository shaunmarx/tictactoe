import createClient from './client';
import config from '../config';
import apiClient from './apiClient';
import normalize from './normalize';

var client = apiClient(createClient(config.baseUrl, fetch), config.domain);

export default { client, normalize };