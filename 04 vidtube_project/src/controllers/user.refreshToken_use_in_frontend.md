Great question! You're halfway there — your **backend refresh token API** is implemented well. Now, let’s talk about **how to implement the refresh token flow on the frontend.**

---

## ✅ Goal

When the **access token expires**, your frontend should:
1. Detect the 401 (unauthorized).
2. Automatically call the **refresh token API**.
3. Retry the original request with the **new access token**.

---

## ✅ Basic Implementation in Frontend (with `fetch` or `axios`)

### Step 1: Create a Refresh Token API call

Assuming your backend sets the token in `HttpOnly` cookies (as in your code), you **don’t need to send tokens manually**, just pass `credentials: "include"`.

```js
// utils/api.js

export const refreshAccessToken = async () => {
  const res = await fetch("/api/v1/users/refresh-token", {
    method: "POST",
    credentials: "include", // IMPORTANT: sends cookies
  });

  if (!res.ok) {
    throw new Error("Unable to refresh token");
  }

  const data = await res.json();
  return data?.data?.accessToken;
};
```

---

### Step 2: Automatically Refresh & Retry on 401 (Example using Axios)

```js
// utils/axiosInstance.js
import axios from "axios";
import { refreshAccessToken } from "./api";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
  withCredentials: true, // sends cookies with every request
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken(); // this will update the cookies
        return axiosInstance(originalRequest); // retry original request
      } catch (err) {
        console.error("Refresh token failed", err);
        // logout user or redirect to login page
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
```

---

### Step 3: Use it in your app

```js
import axiosInstance from "./utils/axiosInstance";

const fetchUserData = async () => {
  try {
    const res = await axiosInstance.get("/users/profile");
    console.log(res.data);
  } catch (err) {
    console.log("Something went wrong", err);
  }
};
```

---

## 🔒 Summary

- ✅ Use `credentials: "include"` in fetch or `withCredentials: true` in axios to send cookies.
- ✅ Implement an **interceptor** or middleware to retry on 401.
- ✅ Refresh token is stored in an `HttpOnly` cookie for security — not accessible via JS.


