const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = function() {
  const datesDir = path.join(__dirname, 'dates');

  // Check if directory exists
  if (!fs.existsSync(datesDir)) {
    return [];
  }

  // Read all markdown files in the dates directory
  const files = fs.readdirSync(datesDir)
    .filter(file => file.endsWith('.md'));

  // Parse each file and extract frontmatter
  const dates = files.map(file => {
    const filePath = path.join(datesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      ...data,
      filename: file
    };
  })
  // Sort by date (most recent first)
  .sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  })
  // Filter out past dates
  .filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });

  return dates;
};
