export interface EventParams {
  id: string;
}

export interface EventQuery {
  month?: string;
  year?: string;
}

export interface CreateEventBody {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
}

export interface UpdateEventBody {
  title?: string;
  description?: string | null;
  startDate?: string;
  endDate?: string | null;
}
