import { Test } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User, UserRole } from "./entities/user.entity";
import { JwtService } from "src/jwt/jwt.service";
import { Repository } from "typeorm";

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

const mockJwtService = {
  sign: jest.fn(() => "signed-token"),
  verify: jest.fn(),
};

type MockRepository<T = any> = Partial<
  Record<keyof Repository<User>, jest.Mock>
>;

describe("UsersService", () => {
  let service: UsersService;
  let userRepository: MockRepository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          // USerRepository
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          // JwtService
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

    userRepository = module.get(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createAccount", () => {
    const createAccountArgs = {
      email: "test@mail.com",
      password: "123",
      role: UserRole.HOST,
    };

    it("should fail if user exists", async () => {
      userRepository.findOne.mockResolvedValue({
        id: 1,
        email: "test@mail.com",
        role: UserRole.HOST,
      });
      const result = await service.createAccount(createAccountArgs);
      expect(result).toMatchObject({
        ok: false,
        error: "There is a user with that email already",
      });
    });

    it("should create a new user", async () => {
      userRepository.findOne.mockResolvedValue(undefined);
      userRepository.create.mockReturnValue(createAccountArgs);
      userRepository.save.mockReturnValue(createAccountArgs);

      const result = await service.createAccount(createAccountArgs);

      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledWith(createAccountArgs);

      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith(createAccountArgs);

      expect(result).toEqual({ ok: true });
    });

    it("should fail on exception", async () => {
      userRepository.findOne.mockRejectedValue(new Error());
      const result = await service.createAccount(createAccountArgs);
      expect(result).toEqual({ ok: false, error: "Couldn`t create account" });
    });
  });

  describe("login", () => {
    const loginArgs = {
      email: "loginTest@email.com",
      password: "password",
    };

    it("should fail if user does not exist", async () => {
      userRepository.findOne.mockResolvedValue(null);

      const result = await service.login(loginArgs);

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toEqual({
        ok: false,
        error: "User not found",
      });
    });

    it("should fail if the password is wrong", async () => {
      const mockedUser = {
        checkPassword: jest.fn(() => Promise.resolve(false)),
      };
      userRepository.findOne.mockResolvedValue(mockedUser);
      const result = await service.login(loginArgs);
      expect(result).toEqual({ ok: false, error: "Wrong password" });
    });

    it("should return token if password correct", async () => {
      const mockedUser = {
        id: 1,
        checkPassword: jest.fn(() => Promise.resolve(true)),
      };
      userRepository.findOne.mockResolvedValue(mockedUser);
      const result = await service.login(loginArgs);
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith(expect.any(Number));
      expect(result).toEqual({ ok: true, token: "signed-token" });
    });

    it("should fail on exception", async () => {
      userRepository.findOne.mockRejectedValue(new Error());
      const result = await service.login(loginArgs);
      expect(result).toEqual({ ok: false, error: "Can't log user in." });
    });
  });
});
