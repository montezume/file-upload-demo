const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM": {
      return {
        ...state,
        searchTerm: action.payload,
      };
    }

    case "CREATE_FILE": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "CREATE_FILE_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        hasFileUploadError: false,
        files: state.files.concat(action.payload),
      };
    }
    case "CREATE_FILE_ERROR": {
      return {
        ...state,
        hasFileUploadError: true,
        isLoading: false,
      };
    }

    case "DELETE_FILE": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "DELETE_FILE_SUCCESS": {
      return {
        ...state,
        hasFileDeletionError: false,
        files: state.files.filter(file => file.id !== action.payload),
        isLoading: false,
      };
    }
    case "DELETE_FILE_ERROR": {
      return {
        ...state,
        hasFileDeletionError: true,
        isLoading: false,
      };
    }

    case "LOAD_FILES": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "LOAD_FILES_SUCCESS": {
      return {
        ...state,
        hasFileLoadingError: false,
        isLoading: false,
        files: action.payload,
      };
    }

    case "LOAD_FILES_ERROR": {
      return {
        ...state,
        hasFileLoadingError: true,
        isLoading: false,
        files: [],
      };
    }

    default:
      return state;
  }
};

export default reducer;
