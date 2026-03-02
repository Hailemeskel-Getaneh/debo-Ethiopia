John Mybro, [2/16/2026 11:02 PM]
/* =========================================================
   ROLES
   ========================================================= */
CREATE TABLE roles (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL.
  description TEXT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  update_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

/* =========================================================
   USERS
   ========================================================= */
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  role_id CHAR(36) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone_number VARCHAR(25) NULL,
  password VARCHAR(225) NOT NULL,
  image_url TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_users_role
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
);

/* =========================================================
   STATS / DASHBOARD METRICS
   ========================================================= */
CREATE TABLE stats_metrics (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(150) UNIQUE NOT NULL,
  value INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =========================================================
   PROGRAMS (Ongoing Services)
   ========================================================= */
CREATE TABLE programs (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =========================================================
   PROJECTS (Operational Initiatives)
   ========================================================= */
 CREATE TABLE project_owners(
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id CHAR(36) NOT NULL,
   project_id CHAR(36) NOT NULL,
  CONSTRAINT fk_users_user_id
     FOREIGN KEY (user_id)
     REFERENCES users(id),
  CONSTRAINT fk_projects_project_id
    FOREIGN KEY (project_id)
    REFERENCES projects(id),
    UNIQUE KEY(project_id,user_id)
  );
  
CREATE TABLE projects (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  location VARCHAR(150),
  budget DECIMAL(10,2) DEFAULT 0.0,
  currency VARCHAR(10),
  start_date DATE,
  end_date DATE,
  status VARCHAR(50),
  progress_percent DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

/* =========================================================
   EVENTS (Scheduled Activities)
   ========================================================= */
CREATE TABLE events (
  id CHAR(36) PRIMARY KEY,
  program_id CHAR(36) DEFAULT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  location VARCHAR(150),
  start_date DATETIME,
  end_date DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_events_program
    FOREIGN KEY (program_id)
    REFERENCES programs(id)
);

CREATE TABLE event_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_url TEXT,
  event_id CHAR(36),
  CONSTRAINT fk_events_event_id
   FOREIGN KEY (event_id)
   REFERENCES events(id)
);

/* =========================================================
   NEWS / UPDATES
   ========================================================= */
CREATE TABLE news (
  id CHAR(36) PRIMARY KEY,
  author_id CHAR(36) NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  is_published BOOL DEFAULT 0,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_author_id
    FOREIGN KEY (author_id)
    REFERENCES events(id)
);

CREATE TABLE news_media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url TEXT NOT NULL,
  news_id CHAR(36) NOT NULL,
  CONSTRAINT fk_news_news_id
    FOREIGN KEY (news_id)
    REFERENCES news(id)
);

/* =========================================================
   GALLERY CATEGORIES
   ========================================================= */
CREATE TABLE media_types (
  id CHAR(36) PRIMARY KEY,
  type VARCHAR(100) UNIQUE NOT NULL -- Image, Video
);

John Mybro, [2/16/2026 11:02 PM]


/* =========================================================
   GALLERY / MEDIA
   ========================================================= */
CREATE TABLE gallery (
  id CHAR(36) PRIMARY KEY,
  user_id CHAT(36) NOT NULL,
  media_id CHAR(36) NOT NULL,
  resource_url TEXT NOT NULL, -- image_url or video_url
  title VARCHAR(200),
  description TEXT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_gallery_media
  FOREIGN KEY (media_id) REFERENCES media_types(id),
  CONSTRAINT fk_users_user_id
    FOREIGN KEY(user_id)
    REFERENCES users(id)
);

/* =========================================================
   DONATIONS
   ========================================================= */
CREATE TABLE donations (
  id CHAR(36) PRIMARY KEY,
  first_name VARCHAR(150),
  last_name VARCHAR(150),
  email VARCHAR(150),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  is_one_time BOOL DEFAULT 0,
  payment_method VARCHAR(50),
  transaction_id VARCHAR(50),
  payment_status VARCHAR(20),
  note TEXT,
  donated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- One-time
-- Monthly

/* =========================================================
   CONTACT MESSAGES
   ========================================================= */
CREATE TABLE contacts (
  id CHAR(36) PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  email VARCHAR(150),
  is_responded BOOL DEFAULT 0,
  response TEXT NULL,
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =========================================================
   SUBSCRIBERS / NEWSLETTER
   ========================================================= */
CREATE TABLE subscribers (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(150) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =========================================================
   ACHIEVEMENTS
   ========================================================= */
CREATE TABLE achievements (
  id CHAR(36) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  image_url TEXT NULL,
  achieved_at DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);