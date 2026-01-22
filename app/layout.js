export const metadata = {
  title: 'Cat Me and Me',
  description: 'Two adorable cats just for you',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
