import axios from 'axios';
import type { Note } from '../types/note';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://notehub-api.goit.global';
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag?: string;
}


export async function fetchNotes(
  page: number = 1,
  perPage: number = 12,
  search: string = ''
): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
    },
  });
  return response.data;
}


export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}


export async function createNote(noteData: CreateNoteDto): Promise<Note> {
  const response = await api.post<Note>('/notes', noteData);
  return response.data;
}


export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}