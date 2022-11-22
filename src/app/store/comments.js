import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreateRequested: (state) => {
            state.error = null;
        },
        commentCreateSuccess: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        commentCreateFailed: (state, action) => {
            state.error = action.payload;
        },
        commentRemoveRequested: (state) => {
            state.error = null;
        },
        commentRemoveSuccess: (state, action) => {
            console.log(action);
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
        commentRemoveFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreateFailed,
    commentCreateRequested,
    commentCreateSuccess,
    commentRemoveRequested,
    commentRemoveSuccess,
    commentRemoveFailed
} = actions;

export const loadCommentsList = (UserId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(UserId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};
export const createComment =
    (data, userId, currentUserId) => async (dispatch) => {
        dispatch(commentCreateRequested());
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };
        try {
            const { content } = await commentService.createComment(comment);
            dispatch(commentCreateSuccess(content));
        } catch (error) {
            dispatch(commentCreateFailed(error.message));
        }
    };
export const removeComment = (id) => async (dispatch) => {
    dispatch(commentRemoveRequested());
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(commentRemoveSuccess(id));
        }
    } catch (error) {
        dispatch(commentRemoveFailed());
    }
};
export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
