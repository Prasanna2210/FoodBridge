import api from "./api";

export const getDonorDashboard = async () => {
  const response = await api.get("/dashboard/donor");
  return response.data;
};

export const getRecipientDashboard = async () => {
  const response = await api.get("/dashboard/recipient");
  return response.data;
};