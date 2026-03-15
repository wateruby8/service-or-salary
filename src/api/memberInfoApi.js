import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const updateWorkerProfile = async (userId, form) => {
  const currentUserRes = await api.get(`/users/${userId}`);
  const currentUser = currentUserRes.data;

  const payload = {
    worker: {
      ...(currentUser.worker || {}),
      name: form.nickname.trim(),
      location: form.city,
      summary: form.summary.trim(),
      serviceDescription: form.service.trim(),
      skills: form.skills,
    },
  };

  const response = await api.patch(`/users/${userId}`, payload);
  return response.data;
};