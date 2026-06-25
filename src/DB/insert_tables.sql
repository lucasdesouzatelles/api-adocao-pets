USE pets_db;

INSERT INTO users (name, email, password, phone, role) VALUES 
('Admin', 'admin@email.com', '$2b$10$yqfo0sO7q/BeZQ2PW4ep9uQMc78M.J3Dz4JXvPbG9TDIIE2ddajBO', '54111111111', 'admin'),
('Alberto Almeida', 'AAlmeida1337mitinho@email.com', '$2b$10$BZim0ysP72TCXU8jVGOGfeLGJJ02hlxq9.9sKDLWK19vuywkGe9Ay', '54222222222', 'adopter');

INSERT INTO pets (name, age, species, size, status, description) VALUES 
('Terror', 12, 'dog', 'medium', 'available', 'O melhor amigo do seu dono, apenas.'),
('Mima', 2, 'cat', 'small', 'available', 'Come, dorme, mia e só!'),
('Rex', 650, 'dog', 'extra large', 'adopted', 'Esse pet já foi adotado!');

INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES 
(2, 3, CURDATE());
