import { DataProvider } from "@refinedev/core";

// Mock dataset
const mentions = [
  { id: 1, platform: "Twitter", content: "Negative tweet about you", sentiment: "negative", createdAt: new Date().toISOString() },
  { id: 2, platform: "LinkedIn", content: "Positive feedback on your work", sentiment: "positive", createdAt: new Date().toISOString() },
];

const reports = [
  { id: 1, title: "Weekly Reputation Report", summary: "2 negative mentions, 5 positive mentions", createdAt: new Date().toISOString() },
];

const actions = [
  { id: 1, action: "Requested takedown from Twitter", status: "pending", createdAt: new Date().toISOString() },
];

const notifications = [
  { id: 1, type: "negative", title: "New Negative Mention", message: "Someone mentioned you negatively on Twitter", createdAt: new Date().toISOString(), read: false },
  { id: 2, type: "report", title: "Report Ready", message: "Your weekly report is ready", createdAt: new Date().toISOString(), read: true },
];

const supportTickets: any[] = [];

export const mockDataProvider: DataProvider = {
  getList: async ({ resource }) => {
    let data: any[] = [];
    switch (resource) {
      case "mentions": data = mentions; break;
      case "reports": data = reports; break;
      case "actions": data = actions; break;
      case "notifications": data = notifications; break;
      case "support-tickets": data = supportTickets; break;
    }
    return {
      data,
      total: data.length,
    };
  },
  getOne: async () => ({ data: {} }),
  create: async ({ resource, variables }) => {
    if (resource === "support-tickets") {
      const newTicket = { id: supportTickets.length + 1, ...variables, createdAt: new Date().toISOString() };
      supportTickets.push(newTicket);
      return { data: newTicket };
    }
    return { data: variables };
  },
  update: async ({ id, variables }) => ({ data: { id, ...variables } }),
  deleteOne: async ({ id }) => ({ data: { id } }),
};

