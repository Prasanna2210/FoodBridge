import api from "./api";

export const requestDonation = async (donationId, message = "") => {
  const response = await api.post("/requests", {
    donationId,
    message,
  });

  return response.data;
};

export const getMyRequests = async () => {
  const response = await api.get("/requests/my");
  return response.data;
};

export const getDonorRequests = async () => {
  const response = await api.get("/requests/donor");
  return response.data;
};

export const approveRequest = async (id) => {
  const response = await api.put(`/requests/${id}/approve`);
  return response.data;
};

export const rejectRequest = async (id) => {
  const response = await api.put(`/requests/${id}/reject`);
  return response.data;
};

export const completePickup = async (id) => {
  const response = await api.put(`/requests/${id}/complete`);
  return response.data;
};