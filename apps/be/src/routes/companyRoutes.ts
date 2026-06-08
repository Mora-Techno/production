import Elysia from 'elysia';
import CompanyController from '@/controllers/CompanyController';
import { verifyToken } from '@/middlewares/auth';
import { CreateAdminDto, RegisterCompanyDto, UpdateSubscriptionDto } from '@/dto/company.dto';

class CompanyRouter {
  public companyRouter;

  constructor() {
    this.companyRouter = new Elysia({
      prefix: '/companies',
      tags: ['Companies'],
    });
    this.routes();
  }

  private routes() {
    this.companyRouter.post('/register', (c) => CompanyController.register(c), {
      body: RegisterCompanyDto,
      detail: {
        summary: 'Daftar company + leader',
        description:
          'Membuat company baru beserta akun leader. Tier default: free (max 4 user/workstation).',
        tags: ['Companies'],
      },
    });
    this.companyRouter.use(verifyToken());
    this.companyRouter.post('/admins', (c) => CompanyController.createAdmin(c), {
      body: CreateAdminDto,
      detail: {
        summary: 'Buat akun admin',
        description: 'Leader membuat akun admin untuk mengelola workstation.',
        tags: ['Companies'],
      },
    });
    this.companyRouter.get('/admins', (c) => CompanyController.listAdmins(c), {
      detail: {
        summary: 'Daftar admin company',
        tags: ['Companies'],
      },
    });
    this.companyRouter.get('/me', (c) => CompanyController.getProfile(c), {
      detail: {
        summary: 'Profil company saat ini',
        tags: ['Companies'],
      },
    });
    this.companyRouter.patch('/subscription', (c) => CompanyController.updateSubscription(c), {
      body: UpdateSubscriptionDto,
      detail: {
        summary: 'Upgrade/downgrade langganan',
        description: 'Leader mengubah tier (free/pro/enterprise). Pro = max 8 user/workstation.',
        tags: ['Companies'],
      },
    });
  }
}

export default new CompanyRouter().companyRouter;
