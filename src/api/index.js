import axios from "@/axios";

export function getstatistics1() {
    return axios.get('/admin/statistics1')
}

export function getstatistics2() {
    return axios.get('/admin/statistics2')
}

export function getstatistics3(type) {
    return axios.get('/admin/statistics3?type=' + type)
}

export function getImageClassList(page) {
    return axios.get('/admin/image_class/' + page)
}

export function createImageClass(data) {
    return axios.post('/admin/image_class', data)
}

export function updateImageClass(id, data) {
    return axios.post('/admin/image_class/' + id, data)
}

export function deleteImageClass(id) {
    return axios.post(`/admin/image_class/${id}/delete`)
}