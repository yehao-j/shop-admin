import axios from "@/axios";

export function getRuleList(page) {
    return axios.get(`/admin/rule/${page}`)
}

export function updateRuleStatus(id, status) {
    return axios.post(`/admin/rule/${id}/update_status`, { status })
}

export function deleteRule() {
    return axios.post(`/admin/rule/${id}/delete`)
}