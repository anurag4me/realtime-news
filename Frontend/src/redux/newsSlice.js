import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Load all news initially, then filter by category when selected
export const loadNews = createAsyncThunk(
  'news/load',
  async (category = null, { rejectWithValue }) => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/api/news`;
      if (category) {
        url += `?category=${category.toLowerCase()}`;
      }
      const res = await axios.get(url);
      return { data: res.data, category };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to load news');
    }
  }
);

// Load external news for specific category
export const loadExternalNews = createAsyncThunk(
  'news/loadExternal',
  async (category = null, { rejectWithValue }) => {
    try {
      if (!category) return []; // Don't load external news initially
      
      const res = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          category: category.toLowerCase(),
          apiKey: import.meta.env.VITE_NEWS_API_KEY,
        }
      });
      return res.data.articles;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to load external news');
    }
  }
);

// Load trending news (always loads)
export const loadTrendingNews = createAsyncThunk(
  'news/loadTrending',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          pageSize: 5,
          apiKey: import.meta.env.VITE_NEWS_API_KEY,
        }
      });
      return res.data.articles;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to load trending news');
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    allNews: [],       // Stores all news initially loaded
    filteredNews: [],  // News filtered by selected category
    externalNews: [],  // External news for selected category
    trendingNews: [],  // Always loaded trending news
    category: null,    // Null initially, then selected category
    loading: false,
    error: null
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      // Filter news when category changes
      if (action.payload) {
        state.filteredNews = state.allNews.filter(
          item => item.category.toLowerCase() === action.payload.toLowerCase()
        );
      } else {
        state.filteredNews = state.allNews;
      }
    },
    addNews: (state, action) => {
      state.allNews.unshift(action.payload);
      if (!state.category || 
          action.payload.category.toLowerCase() === state.category.toLowerCase()) {
        state.filteredNews.unshift(action.payload);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadNews.fulfilled, (state, action) => {
        state.allNews = action.payload.data;
        state.filteredNews = action.payload.category 
          ? action.payload.data.filter(
              item => item.category.toLowerCase() === action.payload.category.toLowerCase()
            )
          : action.payload.data;
        state.loading = false;
      })
      .addCase(loadNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadExternalNews.fulfilled, (state, action) => {
        state.externalNews = action.payload;
      })
      .addCase(loadTrendingNews.fulfilled, (state, action) => {
        state.trendingNews = action.payload;
      });
  }
});

export const { setCategory, addNews } = newsSlice.actions;
export default newsSlice.reducer;