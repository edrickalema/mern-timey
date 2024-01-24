import AssignmentDiscussion from "../../models/assignments/assignmentDiscussion.js";

// Create Discussion
export const createDiscussion = (req, res) => {
  res.send("Discussion created successfully");
};

// Delete message
export const deleteMessage = (req, res) => {
  res.send("Delete message");
};

// Get Discussion message
export const getDiscussionMessages = (req, res) => {
  res.send("Get discussion messages");
};
