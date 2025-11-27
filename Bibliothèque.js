const prompt = require("prompt-sync")({});
let livres = [
 
];

let abonnes = [
 
];

let empruntes = [];

function add() {
  const nombre_Livres = parseInt(prompt("Combien de livres veux-tu ajouter ?"));

  for (let i = 0; i < nombre_Livres; i++) {
    const titre = prompt(`Titre du livre ${i + 1} :`);
    const auteur = prompt(`Auteur du livre ${i + 1} :`);
    const annee_de_publication = parseInt(
      prompt(`Annee de publication du livre ${i + 1} :`)
    );

    livres.push({
      id: livres.length + 1,
      titre: titre,
      auteur: auteur,
      annee_de_publication: annee_de_publication,
      Disponible: true,
    });
  }
}

function affch_livres() {
  if (livres.length === 0) {
    console.log("pas des livres");
    return;
  }
  for (let counter = 0; counter < livres.length; counter++) {
    console.table(livres[counter]);
  }
}

function affch_titre() {
  const option_choisi = prompt(
    "Tapez 1 pour trier de A à Z, ou 2 pour trier de Z à A :"
  );

  if (option_choisi === "1") {
    livres.sort((a, b) => a.titre.localeCompare(b.titre));
  } else if (option_choisi === "2") {
    livres.sort((a, b) => b.titre.localeCompare(a.titre));
  } else {
    console.log("option invalide !");
  }

  console.log(livres);
}

function affch_annee() {
  const sort_choisi = prompt(
    "Tapez 1 pour trier le livre le plus ancien , ou 2 pour trier Le livre le plus récent :"
  );

  if (sort_choisi === "1") {
    livres.sort((a, b) => a.annee_de_publication - b.annee_de_publication);
  } else if (sort_choisi === "2") {
    livres.sort((a, b) => b.annee_de_publication - a.annee_de_publication);
  } else {
    console.log("option invalide !");
  }

  console.log(livres);
}

function affch_livres_dispo() {
  let livre_dispo = livres.filter((element) => element.Disponible);
  console.log("les livres diponibles sont : ", livre_dispo);
}

function ID_rechercher() {
  let searchId = parseInt(prompt("Entrer Id du livre à rechercher :"));

  let resultat = livres.find((livres) => livres.id === searchId);

  if (resultat) {
    console.log("Livre trouvée :", resultat);
  } else {
    console.log("Aucune livre avec ce Id !", searchId);
  }
}

function ajouterAbonne() {
  const nombre_Abonnes = parseInt(
    prompt("Combien d'abonnées veux-tu ajouter ?")
  );

  for (let i = 0; i < nombre_Abonnes; i++) {
    const nom = prompt(`nom de l'abonnée ${i + 1} :`);
    const prenom = prompt(`prénom  ${i + 1} :`);
    const email = prompt(`l'email de l'abonnée ${i + 1} :`);

    abonnes.push({
      id_abonne: abonnes.length + 1,
      nom: nom,
      prenom: prenom,
      email: email,
    });
  }
}

function affchAbonnes() {
  if(abonnes.length===0){
    console.log("pas d'abonnés")
  }
  else{
  console.table(abonnes);
  }
}

function emprunterLivre() {
  let idLivrechoisi = parseInt(prompt("entrer l'id du livre : "));
  let livre = livres.find((l) => l.id === idLivrechoisi);
  if (!livre) {
    console.log("Le livre n'existe pas");
    return;
  }

  if (!livre.Disponible) {
    console.log("le livre est emprunté");
    return;
  }
  //addition des info
  const IDabonnee = parseInt(prompt("ID de l'abonnée :"));
  const dateEmprunt = prompt("la date du livre emprunté :");

  empruntes.push({
    IDabonnee: IDabonnee,
    idLivrechoisi: idLivrechoisi,
    dateEmprunt: dateEmprunt,
  });
  livre.Disponible = false; //changement du l etat du livre
  console.log("Le livre  a été emprunté par l'abonné : ", IDabonnee);
  console.table(empruntes);
}

function retournerLivre() {
  let idLivreretourner = parseInt(
    prompt("Entrer l'id du livre à retourner : ")
  );
  let livre = livres.find((l) => l.id === idLivreretourner);

  if (!livre) {
    // voir wach had livre kayn f empreint
    console.log(" Ce livre n'existe pas.");
    return;
  }

  //   // 2) نتأكدو واش أصلاً مستعار
  if (livre.Disponible === true) {
    console.log("Ce livre n'est pas emprunté.");
    return;
  }

  //   // 3) تسجيل الإرجاع
  livre.Disponible = true;

  //   // نحيدوه من قائمة emprunts
  empruntes = empruntes.filter((e) => e.ID__livre !== idLivreretourner);

  console.log(` Le livre "${livre.titre}" a été retourné avec succès.`);
  console.table(livres);
  console.table(empruntes);
}

function afficherEmpruntsParAbonne() {
  let idAbonne = parseInt(prompt("Entrer l'id de l'abonné : "));

  //   // 1) نبحث على المشترك
  let abonne = abonnes.find((a) => a.id_abonne === idAbonne);

  if (!abonne) {
    console.log(" L'abonné n'existe pas.");
    return;
  }

  //   // 2) نجيبو غير الاستعارات ديال هاد المشترك
  let empruntsAbonne = empruntes.filter((e) => e.IDabonnee === idAbonne);

  if (empruntsAbonne.length === 0) {
    console.log("Cet abonné n'a emprunté aucun livre.");
    return;
  }

  //   // 3) نعرضو الكتب واحد بواحد
  console.log(` Livres empruntés par ${abonne.nom} :`);

  empruntsAbonne.forEach((e) => {
    let livre = livres.find((l) => l.id === e.idLivrechoisi);
    console.log(`- ${livre.titre} (${livre.auteur})`);
  });
}

let choix = 0;
while (choix !== 12) {
  console.log("\n===== Menu principal=====");
  console.log("1. Ajouter plusieurs livres");
  console.log("2. Afficher tous les livres");
  console.log("3. Trier les livres par titre (ascendant/descendant) ");
  console.log("4. Trier les livres par année de publication ");
  console.log("5. Afficher uniquement les livres disponibles ");
  console.log("6. Rechercher un livre par ID_livre ");
  console.log("7. Ajouter un abonné");
  console.log("8. Afficher tous les abonnés");
  console.log("9.empreinter un livre");
  console.log("10.Retourner le livre");
  console.log("11. Afficher les livres empruntés par un abonné");
  console.log("12.Quiter");
  choix = parseInt(prompt("Choisissez une option  : "));
  switch (choix) {
    case 1:
      add();
      console.log("Livres ajoutées avec succès ! ");
      break;

    case 2:
      affch_livres();
      break;

    case 3:
      affch_titre();

      break;

    case 4:
      affch_annee();
      break;

    case 5:
      affch_livres_dispo();
      break;

    case 6:
      ID_rechercher();
      break;

    case 7:
      ajouterAbonne();
      break;
    case 8:
      affchAbonnes();
      break;
    case 9:
      emprunterLivre();
      break;

    case 10:
      retournerLivre();
      break;
    case 11:
      afficherEmpruntsParAbonne();
      break;
    case 12:
      console.log("Au revoir !");
      break;
    default:
      console.log(" Choix invalide !");
      break;
  }
}
