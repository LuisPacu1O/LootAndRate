export const StarFull = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 .587l3.668 7.57 8.332 1.151-6.064 5.84 1.456 8.25L12 18.897l-7.392 4.5 1.456-8.25L0 9.308l8.332-1.151z" />
  </svg>
);

export const StarHalf = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
  >
    <defs>
      <clipPath id="half-clip">
        <rect x="0" y="0" width="12" height="24" />
      </clipPath>
    </defs>
    <path
      clipPath="url(#half-clip)"
      d="M12 .587l3.668 7.57 8.332 1.151-6.064 5.84 1.456 8.25L12 18.897l-7.392 4.5 
      1.456-8.25L0 9.308l8.332-1.151z"
      fill="currentColor"
    />
    <path
      fill="none"
      stroke="currentColor"
      d="M12 .587l3.668 7.57 8.332 1.151-6.064 5.84 
      1.456 8.25L12 18.897l-7.392 4.5 
      1.456-8.25L0 9.308l8.332-1.151z"
    />
  </svg>
);


export const StarEmpty = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 .587l3.668 7.57 8.332 1.151-6.064 5.84 1.456 8.25L12 18.897l-7.392 4.5 1.456-8.25L0 9.308l8.332-1.151z" />
  </svg>
);
