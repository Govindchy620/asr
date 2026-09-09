/**
 * Centralized Zoho CRM API Client connecting frontend to MongoDB Atlas backend on Port 3000
 */

const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface QueryParams {
  search?: string;
  page?: number;
  per_page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  [key: string]: any;
}

export interface ApiResponse<T> {
  data: T[];
  records?: T[];
  info?: {
    count: number;
    total_count: number;
    page: number;
    per_page: number;
    more_records: boolean;
  };
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || `HTTP error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error(`[API Error] ${options.method || 'GET'} ${endpoint}:`, error.message);
      throw error;
    }
  }

  // Fetch list of records for any module
  async fetchRecords<T = any>(module: string, params?: QueryParams): Promise<ApiResponse<T>> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query.append(key, String(value));
        }
      });
    }
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.request<ApiResponse<T>>(`/${module}${queryString}`);
  }

  // Fetch single record by ID
  async fetchRecord<T = any>(module: string, id: string): Promise<T> {
    return this.request<T>(`/${module}/${id}`);
  }

  // Create record
  async createRecord<T = any>(module: string, data: any): Promise<T> {
    return this.request<T>(`/${module}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update record
  async updateRecord<T = any>(module: string, id: string, data: any): Promise<T> {
    return this.request<T>(`/${module}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete single record
  async deleteRecord(module: string, id: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/${module}/${id}`, {
      method: 'DELETE',
    });
  }

  // Mass delete records
  async bulkDeleteRecords(module: string, ids: string[]): Promise<{ success: boolean; deletedCount: number }> {
    return this.request<{ success: boolean; deletedCount: number }>(`/${module}/bulk-delete`, {
      method: 'POST',
      body: JSON.stringify({ ids }),
    });
  }

  // Convert Lead into Contact + Account + Deal
  async convertLead(id: string, payload: { dealData?: any; owner?: string }): Promise<any> {
    return this.request<any>(`/leads/${id}/convert`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Get Workqueue summary stats
  async fetchWorkqueueSummary(): Promise<any> {
    return this.request<any>('/workqueue/summary');
  }

  // Get related records (e.g. contacts of account, deals of account)
  async fetchRelatedRecords<T = any>(module: string, id: string, relatedModule: string): Promise<T[]> {
    return this.request<T[]>(`/${module}/${id}/related/${relatedModule}`);
  }

  // Get activities (Tasks, Meetings, Calls) for a record
  async fetchActivities<T = any>(id: string): Promise<T[]> {
    return this.request<T[]>(`/${id}/activities`);
  }

  // Create an activity (Task, Meeting, Call) linked to a parent record
  async addActivity(data: any): Promise<any> {
    const activityModule = data.activityType === 'meeting' ? 'meetings' : data.activityType === 'call' ? 'calls' : 'tasks';
    return this.createRecord(activityModule, data);
  }
}

export const api = new ApiService();
export default api;
