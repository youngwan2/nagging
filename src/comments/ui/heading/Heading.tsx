interface PropsType {
  level: string;
  className?: string;
  children: React.ReactNode;
}

export default function Heading({ level, className, children }: PropsType) {
  switch (level) {
    case '1':
      return (
        <h1
          className={`${className} text-4xl font-bold tracking-tight text-gray-900 dark:text-white`}
        >
          {children}
        </h1>
      );
    case '2':
      return (
        <h2
          className={`${className} text-3xl font-bold tracking-tight text-gray-900 dark:text-white`}
        >
          {children}
        </h2>
      );
    case '3':
      return (
        <h3
          className={`${className} text-2xl font-bold tracking-tight text-gray-900 dark:text-white`}
        >
          {children}
        </h3>
      );
    case '4':
      return (
        <h4
          className={`${className} text-xl font-bold tracking-tight text-gray-900 dark:text-white`}
        >
          {children}
        </h4>
      );
    default:
      return (
        <h1
          className={`${className} text-4xl font-bold tracking-tight text-gray-900 dark:text-white`}
        >
          {children}
        </h1>
      );
  }
}
