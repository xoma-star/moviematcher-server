import axios from "axios";

const $api = axios.create({
    withCredentials: true
})

$api.interceptors.request.use((config) => {
    config.params = {...config.params, api_key: 'c8ae8a04674ddb8d64d4cb06205be86d', language: 'ru-RU'}
    return config
})

export default $api