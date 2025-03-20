import { Test, TestingModule } from '@nestjs/testing';
import { RoleRequestController } from './role-request.controller';
import { RoleRequestService } from './role-request.service';

describe('RoleRequestController', () => {
  let controller: RoleRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleRequestController],
      providers: [RoleRequestService],
    }).compile();

    controller = module.get<RoleRequestController>(RoleRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
