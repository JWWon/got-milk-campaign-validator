declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly NEXT_PUBLIC_TWELVE_LABS_API_KEY: string;
      }
    }
  }
}
