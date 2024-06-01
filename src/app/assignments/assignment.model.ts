import { Matiere } from "../matieres/matiere.model";

export class Assignment {
    _id!: string;
    nom!: string;
    nom_eleve!: string;
    matiere!: string;
    matiereDetails!: Matiere;
    dateDeRendu!: Date;
    rendu!: boolean;
    note!: number;
    remarque!: string
}
