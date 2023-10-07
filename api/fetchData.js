import request from "../utils/http-request";

export const apiGetIdData = async (alphabet) => {
  let uri = "";
  try {
    const uri = `/get/${alphabet}`;
    return await request.get(uri, {});
  } catch (e) {
    return {
      status: "error",
      message: e?.response?.data?.message || e?.message,
    };
  }
};

export const apiGetAllAlphabets = async () => {
  let uri = "";
  try {
    const uri = `/alphabets`;
    return await request.get(uri, {});
  } catch (e) {
    return {
      status: "error",
      message: e?.response?.data?.message || e?.message,
    };
  }
};

export const apiPostData = async (values) => {
  let uri = "";
  try {
    const uri = `/data`;
    return await request.post(uri, values, {});
  } catch (e) {
    return {
      status: "error",
      message: e?.response?.data?.message || e?.message,
    };
  }
};

export const apiGetRandom = async () => {
  let uri = "";
  try {
    const uri = `/random`;
    return await request.get(uri, {});
  } catch (e) {
    return {
      status: "error",
      message: e?.response?.data?.message || e?.message,
    };
  }
};
