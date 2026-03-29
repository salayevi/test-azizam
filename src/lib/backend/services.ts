import type {
  AdminDashboardSummary,
  AssistantCommandPreview,
  AuthSession,
  Cart,
  MediaAsset,
  Order,
  PublicSiteSnapshot,
  SavedItem,
} from "./domain";
import type {
  AssistantCommandConfirmRequest,
  AssistantCommandPreviewRequest,
  AuthCredentialsRequest,
  CartUpsertRequest,
  MediaLibraryListRequest,
  MediaReplaceRequest,
  MediaUploadRequest,
  OrderCreateRequest,
  SavedItemCreateRequest,
} from "./api";

export type PublicSiteContentService = {
  getPublicSiteSnapshot(): Promise<PublicSiteSnapshot>;
};

export type AuthSessionService = {
  getSession(): Promise<AuthSession | null>;
  authenticate(input: AuthCredentialsRequest): Promise<AuthSession>;
  clearSession(): Promise<void>;
};

export type MediaLibraryService = {
  listAssets(input?: MediaLibraryListRequest): Promise<MediaAsset[]>;
  prepareUpload(input: MediaUploadRequest): Promise<MediaAsset>;
  replaceMetadata(input: MediaReplaceRequest): Promise<MediaAsset>;
};

export type AdminContentService = {
  getDashboardSummary(): Promise<AdminDashboardSummary>;
};

export type CommerceService = {
  getSavedItems(userId: string): Promise<SavedItem[]>;
  saveItem(input: SavedItemCreateRequest): Promise<SavedItem>;
  getCart(cartId?: string): Promise<Cart | null>;
  upsertCartLine(input: CartUpsertRequest): Promise<Cart>;
  createOrder(input: OrderCreateRequest): Promise<Order>;
};

export type SmartAdminAssistantService = {
  previewCommand(
    input: AssistantCommandPreviewRequest,
  ): Promise<AssistantCommandPreview>;
  confirmCommand(
    input: AssistantCommandConfirmRequest,
  ): Promise<AssistantCommandPreview>;
};

export type BackendServices = {
  publicSiteContent: PublicSiteContentService;
  authSession: AuthSessionService;
  mediaLibrary: MediaLibraryService;
  adminContent: AdminContentService;
  commerce: CommerceService;
  smartAdminAssistant: SmartAdminAssistantService;
};

function createNotImplementedError(serviceName: string): Error {
  return new Error(`${serviceName} is not implemented in this foundation pass.`);
}

export function createNotImplementedMediaLibraryService(): MediaLibraryService {
  return {
    async listAssets() {
      throw createNotImplementedError("MediaLibraryService.listAssets");
    },
    async prepareUpload() {
      throw createNotImplementedError("MediaLibraryService.prepareUpload");
    },
    async replaceMetadata() {
      throw createNotImplementedError("MediaLibraryService.replaceMetadata");
    },
  };
}

export function createNotImplementedAdminContentService(): AdminContentService {
  return {
    async getDashboardSummary() {
      throw createNotImplementedError("AdminContentService.getDashboardSummary");
    },
  };
}

export function createNotImplementedCommerceService(): CommerceService {
  return {
    async getSavedItems() {
      throw createNotImplementedError("CommerceService.getSavedItems");
    },
    async saveItem() {
      throw createNotImplementedError("CommerceService.saveItem");
    },
    async getCart() {
      throw createNotImplementedError("CommerceService.getCart");
    },
    async upsertCartLine() {
      throw createNotImplementedError("CommerceService.upsertCartLine");
    },
    async createOrder() {
      throw createNotImplementedError("CommerceService.createOrder");
    },
  };
}

export function createNotImplementedSmartAdminAssistantService(): SmartAdminAssistantService {
  return {
    async previewCommand() {
      throw createNotImplementedError(
        "SmartAdminAssistantService.previewCommand",
      );
    },
    async confirmCommand() {
      throw createNotImplementedError(
        "SmartAdminAssistantService.confirmCommand",
      );
    },
  };
}

let temporaryAuthSession: AuthSession | null = null;

export const temporaryLocalAuthSessionService: AuthSessionService = {
  async getSession() {
    return temporaryAuthSession;
  },
  async authenticate(input) {
    const timestamp = new Date().toISOString();
    const emailHandle = input.email.split("@")[0] || "azizam-user";

    temporaryAuthSession = {
      sessionId: `tmp-session-${Date.now()}`,
      userId: `tmp-user-${emailHandle.toLowerCase()}`,
      email: input.email,
      displayName: emailHandle,
      role: "customer",
      status: "authenticated",
      startedAt: timestamp,
      expiresAt: undefined,
    };

    return temporaryAuthSession;
  },
  async clearSession() {
    temporaryAuthSession = null;
  },
};
