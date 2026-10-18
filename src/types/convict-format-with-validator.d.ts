declare module 'convict-format-with-validator' {
  import type convict from 'convict';

  const formats: Record<string, convict.Format>;

  export default formats;
}
