import { createSlice } from "@reduxjs/toolkit";
import assignments from "../../Database/assignments.json";

const initialState = {
  assignments: assignments, // Assuming 'assignments' is an array of assignment objects
  assignment: { title: "New Assignment 123"},
};

  const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            // Correctly prepends a new assignment to the start of the assignments array
            state.assignments.unshift({
              ...action.payload,
              _id: new Date().getTime().toString(),
            });
          },
      deleteAssignment: (state, action) => {
        state.assignments = state.assignments.filter(
          (assignment) => assignment._id !== action.payload
        );
      },
      updateAssignment: (state, action) => {
        state.assignments = state.assignments.map((assignment) => {
          if (assignment._id === action.payload._id) {
            return {
              ...assignment,
              ...action.payload,
            };
          } else {
            return assignment;
          }
        });
      },
      selectAssignment: (state, action) => {
        state.assignment = action.payload;
      },
    },
  });
  
  
  export const { addAssignment, deleteAssignment,
    updateAssignment, selectAssignment } = assignmentsSlice.actions;
  export default assignmentsSlice.reducer;