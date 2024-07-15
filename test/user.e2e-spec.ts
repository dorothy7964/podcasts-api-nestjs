import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import * as request from "supertest";
import { DataSource, Repository } from "typeorm";
import { createAccountMutation } from "./mutations/createAccountMutation.";
import { loginMutation } from "./mutations/loginMutation";
import { User } from "src/users/entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { seeProfileQuery } from "./queries/seeProfileQuery";
import { editProfileMutation } from "./mutations/editProfileMutation";
import { meQuery } from "./queries/meQuery";

const GRAPHQL_ENDPOINT = "/graphql";

const TEST_USER = {
  email: "e2e@gmail.com",
  password: "123",
};

describe("UserModule (E2E)", () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let usersRepository: Repository<User>;

  const baseTest = () => request(app.getHttpServer()).post(GRAPHQL_ENDPOINT);
  const publicTest = (query: string) => baseTest().send({ query });
  const privateTest = (query: string) =>
    baseTest().set("X-JWT", jwtToken).send({ query });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    await app.init();

    dataSource = module.get(DataSource);
  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
    app.close();
  });

  describe("createAccount", () => {
    const QUERY = createAccountMutation(TEST_USER.email, TEST_USER.password);

    it("should create account", () => {
      return publicTest(QUERY)
        .expect(200)
        .expect((res) => {
          const { ok, error } = res.body.data.createAccount;
          expect(ok).toBe(true);
          expect(error).toBe(null);
        });
    });

    it("should fail if account already exists", () => {
      return publicTest(QUERY)
        .expect(200)
        .expect((res) => {
          const { ok, error } = res.body.data.createAccount;
          expect(ok).toBe(false);
          expect(error).toBe("There is a user with that email already");
        });
    });
  });

  describe("login", () => {
    const WRONG_PASSWORD = "XXX";

    const QUERY = loginMutation(TEST_USER.email, TEST_USER.password);
    const FAIL_QUERY = loginMutation(TEST_USER.email, WRONG_PASSWORD);

    it("should login with correct credentials", () => {
      return publicTest(QUERY)
        .expect(200)
        .expect((res) => {
          const { ok, error, token } = res.body.data.login;
          expect(ok).toBe(true);
          expect(error).toBe(null);
          expect(token).toEqual(expect.any(String));
          jwtToken = token;
        });
    });

    it("should not be able to login with wrong credentials", () => {
      return publicTest(FAIL_QUERY)
        .expect(200)
        .expect((res) => {
          const { ok, error, token } = res.body.data.login;
          expect(ok).toBe(false);
          expect(error).toBe("Wrong password");
          expect(token).toBe(null);
        });
    });
  });

  describe("seeProfile", () => {
    let userId: number;

    beforeAll(async () => {
      const [user] = await usersRepository.find();
      userId = user.id;
    });

    const query = (userId: number) => seeProfileQuery(userId);

    it("should see a user's profile", () => {
      return privateTest(query(userId))
        .expect(200)
        .expect((res) => {
          const { ok, error, user } = res.body.data.seeProfile;
          expect(ok).toBe(true);
          expect(error).toBe(null);
          expect(user.id).toBe(userId);
        });
    });

    it("should not find a profile", () => {
      const WRONG_USER_ID = 9999;

      return privateTest(query(WRONG_USER_ID))
        .expect(200)
        .expect((res) => {
          const { ok, error, user } = res.body.data.seeProfile;
          expect(ok).toBe(false);
          expect(error).toBe("User Not Found");
          expect(user).toBe(null);
        });
    });
  });

  describe("editProfile", () => {
    const NEW_EMAIL = "new@mail.com";

    const EDIT_QUERY = editProfileMutation(NEW_EMAIL);
    const CHECK_EDIT_QUERY = meQuery();

    it("should change email", () => {
      return privateTest(EDIT_QUERY)
        .expect(200)
        .expect((res) => {
          const { ok, error } = res.body.data.editProfile;
          expect(ok).toBe(true);
          expect(error).toBe(null);
        });
    });

    it("should have new email", () => {
      return privateTest(CHECK_EDIT_QUERY)
        .expect(200)
        .expect((res) => {
          const { email } = res.body.data.me;
          expect(email).toBe(NEW_EMAIL);
        });
    });
  });
});
