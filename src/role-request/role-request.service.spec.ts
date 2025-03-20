import { Test, TestingModule } from '@nestjs/testing';
import { RoleRequestService } from './role-request.service';

describe('RoleRequestService', () => {
  let service: RoleRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleRequestService],
    }).compile();

    service = module.get<RoleRequestService>(RoleRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
