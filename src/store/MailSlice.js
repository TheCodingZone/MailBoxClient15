import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    allMails: [],
    unreadMails: [],
    sentMails: [],
  },
  reducers: {
    replaceMails(state) {
      state.allMails = [];
      state.sentMails = [];
      state.unreadMails = [];
    },
    addMail(state, action) {
      if (action.payload.sender === localStorage.getItem("email")) {
        state.sentMails.push({ ...action.payload, read: true });
      } else {
        if (!action.payload.read) {
          state.unreadMails.push({ ...action.payload });
        }
        state.allMails.push({ ...action.payload });
      }
    },
    sentMail(state, action) {
      state.sentMails = state.sentMails.filter((value) => {
        return value.mailId !== action.payload.mailId;
      });
    },
    allMail(state, action) {
      state.allMails = state.allMails.filter((value) => {
        return value.mailId !== action.payload.mailId;
      });
    },
  },
});

export const mailAction = mailSlice.actions;

export default mailSlice.reducer;
