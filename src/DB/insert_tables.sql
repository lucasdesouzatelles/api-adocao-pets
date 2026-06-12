USE pets_db;

INSERT INTO users (name, email, password, phone, role) VALUES 
('Admin', 'admin@email.com', 'senha_admin_hash', '54111111111', 'admin'),
('Alberto Almeida', 'AAlmeida1337mitinho@email.com', 'senha_user_hash', '54222222222', 'adopter');

INSERT INTO pets (name, age, species, size, status, description) VALUES 
('Terror', 12, 'dog', 'medium', 'available', 'O melhor amigo do seu dono, apenas.'),
('Mima', 2, 'cat', 'small', 'available', 'Come, dorme, mia e só!'),
('Rex', 650, 'dog', 'extra large', 'adopted', 'Esse pet já foi adotado!');

INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES 
(2, 3, CURDATE());