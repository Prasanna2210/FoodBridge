import api from "./api";

export const getMyDonations = async () => {
  const response = await api.get("/donations/my");
  return response.data;
};

export const getAvailableDonations = async () => {
  const response = await api.get("/donations");
  return response.data;
};

export const deleteDonation = async (id) => {
  const response = await api.delete(`/donations/${id}`);
  return response.data;
};

export const updateDonation = async (id, donationData) => {
  const response = await api.put(
    `/donations/${id}`,
    donationData
  );

  return response.data;
};

export const addDonation = async (donationData) => {
  const response = await api.post("/donations", donationData);
  return response.data;
};