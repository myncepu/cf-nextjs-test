-- 添加游戏分类
INSERT INTO categories (id, name, slug, description, created_at) VALUES 
('cat_01', '动作游戏', 'action', '包含格斗、射击等需要快速反应的游戏', unixepoch()),
('cat_02', '解谜游戏', 'puzzle', '需要动脑思考的智力游戏', unixepoch()),
('cat_03', '策略游戏', 'strategy', '需要战略思维的游戏类型', unixepoch()),
('cat_04', '休闲游戏', 'casual', '简单轻松的休闲类游戏', unixepoch());

-- 添加游戏
INSERT INTO games (id, title, description, thumbnail_url, game_url, category, created_at) VALUES
('game_01', '方块消消乐', '经典的三消游戏，配有精美的画面和音效', 
'https://picsum.photos/seed/puzzle1/400/300', 
'https://example.com/games/puzzle1', 'cat_02', unixepoch()),

('game_02', '太空射手', '复古风格的太空射击游戏', 
'https://picsum.photos/seed/space1/400/300', 
'https://example.com/games/shooter1', 'cat_01', unixepoch()),

('game_03', '城市建设者', '建造和管理你自己的城市', 
'https://picsum.photos/seed/city1/400/300', 
'https://example.com/games/city1', 'cat_03', unixepoch()),

('game_04', '跑酷大冒险', '充满挑战的跑酷游戏', 
'https://picsum.photos/seed/runner1/400/300', 
'https://example.com/games/runner1', 'cat_01', unixepoch()),

('game_05', '数独大师', '经典数独游戏，支持多种难度', 
'https://picsum.photos/seed/puzzle2/400/300', 
'https://example.com/games/sudoku1', 'cat_02', unixepoch()),

('game_06', '农场物语', '轻松愉快的农场经营游戏', 
'https://picsum.photos/seed/farm1/400/300', 
'https://example.com/games/farm1', 'cat_04', unixepoch()); 