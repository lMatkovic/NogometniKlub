





create table klubovi(
sifra int not null primary key identity(1,1),
naziv varchar(30) not null,
osnovan int,
stadion varchar(40),
predsjednik varchar(50),
drzava varchar(30),
liga varchar(40)
);

create table igraci(
sifra int not null primary key identity(1,1),
ime varchar(30) not null,
prezime varchar(30) not null,
datumrodjenja datetime not null,
pozicija varchar(30),
brojdresa int,
klub int not null
);

create table utakmice(
sifra int not null primary key identity(1,1),
datum datetime not null,
lokacija varchar(30),
stadion varchar(30),
domaci_klub int not null,
gostujuci_klub int not null,
);

create table treneri(
sifra int not null primary key identity(1,1),
ime varchar(30) not null,
prezime varchar(30) not null,
klub int not null,
nacionalnost varchar(30),
iskustvo varchar(30),
);

alter table igraci add foreign key (klub) references klubovi(sifra);
alter table utakmice add foreign key (domaci_klub) references klubovi(sifra);
alter table utakmice add foreign key (gostujuci_klub) references klubovi(sifra);
alter table treneri add foreign key (klub) references klubovi(sifra);

insert into klubovi (naziv, osnovan, stadion, predsjednik, drzava, liga) values
('FC Barcelona', 1899, 'Camp Nou', 'Joan Laporta', 'Španjolska', 'La Liga'),
('Real Madrid', 1902, 'Santiago Bernabeu', 'Florentino Perez', 'Španjolska', 'La Liga'),
('Manchester United', 1878, 'Old Trafford', 'Joel Glazer', 'Engleska', 'Premier League'),
('Bayern Munich', 1900, 'Allianz Arena', 'Herbert Hainer', 'Njemačka', 'Bundesliga');

select * from klubovi;

insert into igraci (ime, prezime, datumrodjenja, pozicija, brojdresa, klub) values
('Robert', 'Lewandowski', '1988-08-21', 'Napadač', 9, 1),
('Luka', 'Modrić', '1985-09-09', 'Vezni', 10, 2),
('Harry', 'Maguire', '1993-03-05', 'Obrambeni', 5, 3),
('Manuel', 'Neuer', '1986-03-27', 'Golman', 1, 4); 

select * from igraci;

insert into utakmice (datum, lokacija, stadion, domaci_klub, gostujuci_klub) values
('2023-08-10 20:00','Barcelona', 'Camp Nou', 1, 2),
('2023-09-15 21:00','Madrid', 'Santiago Bernabeu', 2, 3),
('2024-03-21 19:00','Manchester', 'Old Trafford', 3, 4),
('2024-04-08 18:00', 'Munich', 'Allianz Arena', 4, 1);

select * from utakmice;

insert into treneri (ime, prezime, klub, nacionalnost, iskustvo) values
('Hansi', 'Flick', 1, 'Nijemac', '5 godina'),
('Carlo', 'Ancelotti', 2, 'Talijan', '20 godina'),
('Erik', 'ten Hag', 3, 'Nizozemac', '10 godina'),  
('Vincent', 'Kompany', 4, 'Belgijac', '7 godina'); 

select * from treneri;