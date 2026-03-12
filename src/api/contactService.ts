import type { ContactFormData } from "@/validation";
import { baseApi } from "./api";
import { exceptionHandler } from "./ExceptionHandler";

export const contactService = {
  sendMessage: async (data: ContactFormData) => {
    try {
      const response = await baseApi.post("/contact-messages/submit/", data);
      return response.data;
    } catch (error: any) {
      exceptionHandler.emit({
        message:
          error.response?.data?.detail ||
          "Unable to send message. Pleas try again!!",
        type: "error",
      });
      throw error;
    }
  },
};
