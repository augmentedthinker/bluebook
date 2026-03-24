export interface BenchmarkCase {
  id: number;
  sourceType: string;
  context: string;
  inputPrompt: string;
  expectedCitation: string;
}

export const BENCHMARKS: BenchmarkCase[] = [
  {
    id: 1,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The D.C. Circuit case about CareFirst where the court said data-breach plaintiffs can have standing based on a substantial risk of identity theft.",
    expectedCitation: "Attias v. CareFirst, Inc., 865 F.3d 620 (D.C. Cir. 2017)."
  },
  {
    id: 2,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The D.D.C. decision in the CareFirst data breach case on remand that addressed a motion to dismiss and state-law damages issues.",
    expectedCitation: "Attias v. CareFirst, Inc., 365 F. Supp. 3d 1 (D.D.C. 2019)."
  },
  {
    id: 3,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The D.C. Circuit OPM breach case saying heightened risk and mitigation costs can be enough for Article III standing in a breach.",
    expectedCitation: "In re U.S. Office of Pers. Mgmt. Data Sec. Breach Litig., 928 F.3d 42 (D.C. Cir. 2019)."
  },
  {
    id: 4,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The D.D.C. district court decision in the OPM data breach MDL that got appealed—before the D.C. Circuit reversed in part.",
    expectedCitation: "In re U.S. Office of Pers. Mgmt. Data Sec. Breach Litig., 266 F. Supp. 3d 1 (D.D.C. 2017)."
  },
  {
    id: 5,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The Supreme Court standing case that says a bare statutory violation isn’t automatically a concrete injury—Spokeo.",
    expectedCitation: "Spokeo, Inc. v. Robins, 578 U.S. 330 (2016)."
  },
  {
    id: 6,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The Supreme Court case limiting class standing where most class members didn’t have concrete injury—TransUnion v. Ramirez.",
    expectedCitation: "TransUnion LLC v. Ramirez, 594 U.S. 413 (2021)."
  },
  {
    id: 7,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The Supreme Court standing case about ‘certainly impending’ injuries—Clapper v. Amnesty International.",
    expectedCitation: "Clapper v. Amnesty Int'l USA, 568 U.S. 398 (2013)."
  },
  {
    id: 8,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The Supreme Court digital privacy case about needing a warrant for historical cell-site location information—Carpenter.",
    expectedCitation: "Carpenter v. United States, 585 U.S. 296 (2018)."
  },
  {
    id: 9,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The Supreme Court GPS tracking case out of D.C. that held attaching a GPS device and monitoring is a search—United States v. Jones.",
    expectedCitation: "United States v. Jones, 565 U.S. 400 (2012)."
  },
  {
    id: 10,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The Supreme Court CFAA case about what it means to ‘exceed authorized access’—Van Buren.",
    expectedCitation: "Van Buren v. United States, 593 U.S. 374 (2021)."
  },
  {
    id: 11,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The D.C. Circuit Privacy Act case about personnel file information and due process-like procedures—Dickson v. OPM.",
    expectedCitation: "Dickson v. Office of Pers. Mgmt., 828 F.2d 32 (D.C. Cir. 1987)."
  },
  {
    id: 12,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The D.C. Court of Appeals case where a hospital employee disclosed someone’s HIV status and it led to tort liability—Doe v. Medlantic.",
    expectedCitation: "Doe v. Medlantic Health Care Grp., Inc., 814 A.2d 939 (D.C. 2003)."
  },
  {
    id: 13,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The D.C. Court of Appeals case about a landlord going through a tenant’s trash and whether that’s intrusion on seclusion—Danai.",
    expectedCitation: "Danai v. Canal Square Assocs., 862 A.2d 395 (D.C. 2004)."
  },
  {
    id: 14,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The D.C. Court of Appeals case that’s often cited for privacy torts, including intrusion upon seclusion and publicity given to private life—Wolf v. Regardie.",
    expectedCitation: "Wolf v. Regardie, 553 A.2d 1213 (D.C. 1989)."
  },
  {
    id: 15,
    sourceType: "case",
    context: "litigation",
    inputPrompt: "The D.C. Court of Appeals privacy case where a plastic surgeon used before-and-after photos and the court discussed privacy/publicity—Vassiliades.",
    expectedCitation: "Vassiliades v. Garfinckel's, 492 A.2d 580 (D.C. 1985)."
  },
  {
    id: 16,
    sourceType: "statute",
    context: "litigation",
    inputPrompt: "The main D.C. Consumer Protection Procedures Act section listing unfair or deceptive trade practices.",
    expectedCitation: "D.C. Code § 28-3904."
  },
  {
    id: 17,
    sourceType: "statute",
    context: "litigation",
    inputPrompt: "The D.C. statute that requires notifying D.C. residents after a security breach of personal information.",
    expectedCitation: "D.C. Code § 28-3852."
  },
  {
    id: 18,
    sourceType: "statute",
    context: "litigation",
    inputPrompt: "The D.C. data breach statute definition section—what counts as a ‘breach of the security of the system’ and ‘personal information’.",
    expectedCitation: "D.C. Code § 28-3851."
  },
  {
    id: 19,
    sourceType: "statute",
    context: "litigation",
    inputPrompt: "The D.C. code section that requires reasonable security safeguards for personal information—not just breach notification.",
    expectedCitation: "D.C. Code § 28-3852.01."
  },
  {
    id: 20,
    sourceType: "statute",
    context: "litigation",
    inputPrompt: "The D.C. breach law section that requires identity theft protection services when Social Security numbers/Tax IDs get exposed.",
    expectedCitation: "D.C. Code § 28-3852.02."
  },
  {
    id: 21,
    sourceType: "statute",
    context: "litigation",
    inputPrompt: "The D.C. debt collection law section—used in consumer cases and sometimes paired with CPPA claims.",
    expectedCitation: "D.C. Code § 28-3814."
  },
  {
    id: 22,
    sourceType: "statute",
    context: "litigation",
    inputPrompt: "The Computer Fraud and Abuse Act—18 U.S.C. section 1030.",
    expectedCitation: "18 U.S.C. § 1030."
  },
  {
    id: 23,
    sourceType: "statute",
    context: "litigation",
    inputPrompt: "The Stored Communications Act provision for a 2703(d) court order (the one that came up a lot leading into Carpenter).",
    expectedCitation: "18 U.S.C. § 2703(d)."
  },
  {
    id: 24,
    sourceType: "statute",
    context: "litigation",
    inputPrompt: "The Privacy Act of 1974—the statute that governs federal agency records about individuals.",
    expectedCitation: "5 U.S.C. § 552a."
  },
  {
    id: 25,
    sourceType: "statute",
    context: "litigation",
    inputPrompt: "Class Action Fairness Act jurisdiction—the part of 28 U.S.C. 1332 that covers class actions and $5 million amount-in-controversy.",
    expectedCitation: "28 U.S.C. § 1332(d)."
  },
  {
    id: 26,
    sourceType: "rule",
    context: "litigation",
    inputPrompt: "The federal rule saying you don't have to produce ESI that's not reasonably accessible because of undue burden or cost—Rule 26(b)(2)(B).",
    expectedCitation: "Fed. R. Civ. P. 26(b)(2)(B)."
  },
  {
    id: 27,
    sourceType: "rule",
    context: "litigation",
    inputPrompt: "The federal spoliation rule for ESI—Rule 37(e).",
    expectedCitation: "Fed. R. Civ. P. 37(e)."
  },
  {
    id: 28,
    sourceType: "rule",
    context: "litigation",
    inputPrompt: "The new federal civil rule about multidistrict litigation case management—Rule 16.1.",
    expectedCitation: "Fed. R. Civ. P. 16.1."
  },
  {
    id: 29,
    sourceType: "rule",
    context: "litigation",
    inputPrompt: "The federal rule about form of production in document/ESI requests—Rule 34(b)(2)(E).",
    expectedCitation: "Fed. R. Civ. P. 34(b)(2)(E)."
  },
  {
    id: 30,
    sourceType: "rule",
    context: "litigation",
    inputPrompt: "The federal evidence rule that lets a court order a clawback / non-waiver order—Rule 502(d).",
    expectedCitation: "Fed. R. Evid. 502(d)."
  },
  {
    id: 31,
    sourceType: "rule",
    context: "litigation",
    inputPrompt: "The federal evidence rule for self-authentication of records generated by an electronic process or system—Rule 902(13).",
    expectedCitation: "Fed. R. Evid. 902(13)."
  },
  {
    id: 32,
    sourceType: "rule",
    context: "litigation",
    inputPrompt: "The D.D.C. local civil rule about electronic filing in CM/ECF, including privacy/redaction requirements—Local Rule 5.4.",
    expectedCitation: "D.D.C. LCvR 5.4."
  },
  {
    id: 33,
    sourceType: "rule",
    context: "litigation",
    inputPrompt: "The D.D.C. local rule about requesting oral hearings on motions—Local Rule 7(f).",
    expectedCitation: "D.D.C. LCvR 7(f)."
  },
  {
    id: 34,
    sourceType: "regulation",
    context: "litigation",
    inputPrompt: "The FTC Safeguards Rule section that explains purpose and scope—16 CFR 314.1.",
    expectedCitation: "16 C.F.R. § 314.1."
  },
  {
    id: 35,
    sourceType: "regulation",
    context: "litigation",
    inputPrompt: "The FTC Health Breach Notification Rule requirement to notify individuals and the FTC—16 CFR 318.3.",
    expectedCitation: "16 C.F.R. § 318.3."
  },
  {
    id: 36,
    sourceType: "regulation",
    context: "litigation",
    inputPrompt: "The SEC/financial-institution safeguards requirement in Regulation S-P—17 CFR 248.30.",
    expectedCitation: "17 C.F.R. § 248.30."
  },
  {
    id: 37,
    sourceType: "regulation",
    context: "litigation",
    inputPrompt: "HIPAA Breach Notification Rule: the regulation that requires covered entities to notify individuals—45 CFR 164.404.",
    expectedCitation: "45 C.F.R. § 164.404."
  },
  {
    id: 38,
    sourceType: "regulation",
    context: "litigation",
    inputPrompt: "HIPAA Security Rule: administrative safeguards—45 CFR 164.308.",
    expectedCitation: "45 C.F.R. § 164.308."
  },
  {
    id: 39,
    sourceType: "regulation",
    context: "litigation",
    inputPrompt: "HIPAA Security Rule: technical safeguards—45 CFR 164.312.",
    expectedCitation: "45 C.F.R. § 164.312."
  },
  {
    id: 40,
    sourceType: "regulation",
    context: "litigation",
    inputPrompt: "The FCC/telecom CPNI breach rule that requires notifying law enforcement—47 CFR 64.2011.",
    expectedCitation: "47 C.F.R. § 64.2011."
  },
  {
    id: 41,
    sourceType: "secondary_source",
    context: "litigation",
    inputPrompt: "The DOJ’s big Privacy Act treatise/overview that courts and lawyers cite—the 2020 edition PDF.",
    expectedCitation: "U.S. Dep’t of Justice, Office of Privacy & Civil Liberties, Overview of the Privacy Act of 1974 (2020 ed.) (Oct. 16, 2020)."
  },
  {
    id: 42,
    sourceType: "secondary_source",
    context: "litigation",
    inputPrompt: "The FTC plain-language booklet ‘Data Breach Response: A Guide for Business’ (the one with steps after a breach).",
    expectedCitation: "Fed. Trade Comm’n, Data Breach Response: A Guide for Business (May 2019)."
  },
  {
    id: 43,
    sourceType: "secondary_source",
    context: "litigation",
    inputPrompt: "The official NIST Cybersecurity Framework 2.0 publication (CSF 2.0) that organizations cite for ‘reasonable security’ baselines.",
    expectedCitation: "Nat’l Inst. of Standards & Tech., The NIST Cybersecurity Framework (CSF) 2.0, NIST CSWP 29 (Feb. 26, 2024)."
  },
  {
    id: 44,
    sourceType: "secondary_source",
    context: "litigation",
    inputPrompt: "The newest NIST incident response guidance that replaced the old SP 800-61 Rev. 2—SP 800-61r3.",
    expectedCitation: "Nat’l Inst. of Standards & Tech., Incident Response Recommendations & Considerations for Cybersecurity Risk Mgmt.: A CSF 2.0 Cmty. Profile, NIST SP 800-61r3 (Apr. 3, 2025)."
  },
  {
    id: 45,
    sourceType: "secondary_source",
    context: "litigation",
    inputPrompt: "The NIST catalog of security and privacy controls—NIST SP 800-53 Rev. 5 (controls baseline reference).",
    expectedCitation: "Nat’l Inst. of Standards & Tech., Security & Privacy Controls for Info. Sys. & Orgs., NIST SP 800-53 Rev. 5 (Sept. 2020)."
  },
  {
    id: 46,
    sourceType: "secondary_source",
    context: "litigation",
    inputPrompt: "The NIST guide specifically about protecting the confidentiality of PII—SP 800-122.",
    expectedCitation: "Nat’l Inst. of Standards & Tech., Guide to Protecting the Confidentiality of Personally Identifiable Info. (PII), NIST SP 800-122 (Apr. 2010)."
  },
  {
    id: 47,
    sourceType: "secondary_source",
    context: "litigation",
    inputPrompt: "The Sedona Principles Third Edition (Sedona Conference Journal) that courts cite for e-discovery best practices.",
    expectedCitation: "The Sedona Principles, Third Edition: Best Practices, Recommendations & Principles for Addressing Electronic Document Production, 19 Sedona Conf. J. 1 (2018)."
  },
  {
    id: 48,
    sourceType: "secondary_source",
    context: "litigation",
    inputPrompt: "The Federal Judicial Center ‘Managing Discovery of Electronic Information’ pocket guide (Second Edition, 2012).",
    expectedCitation: "Barbara J. Rothstein, Ronald J. Hedges & Elizabeth C. Wiggins, Managing Discovery of Electronic Information: A Pocket Guide for Judges (2d ed. 2012)."
  },
  {
    id: 49,
    sourceType: "secondary_source",
    context: "litigation",
    inputPrompt: "The most recent evidence rules committee report discussing AI-generated evidence and authenticity concerns (Dec. 1, 2025 report).",
    expectedCitation: "Advisory Comm. on Evidence Rules, Report of the Advisory Committee on Evidence Rules (Dec. 1, 2025)."
  },
  {
    id: 50,
    sourceType: "secondary_source",
    context: "litigation",
    inputPrompt: "Restatement section for the privacy tort ‘publicity given to private life’—Restatement (Second) of Torts § 652D.",
    expectedCitation: "Restatement (Second) of Torts § 652D (Am. L. Inst. 1977)."
  }
];

export const BENCHMARKS_2: BenchmarkCase[] = [
  {
    id: 51,
    sourceType: "case",
    context: "D.C. Circuit decision on Article III standing in the OPM data breach litigation.",
    inputPrompt: "in re us office of personnel management data sec breach litig 928 f3d 42 2019",
    expectedCitation: "In re U.S. Off. of Pers. Mgmt. Data Sec. Breach Litig., 928 F.3d 42 (D.C. Cir. 2019)."
  },
  {
    id: 52,
    sourceType: "case",
    context: "D.C. Circuit decision on Article III standing in the OPM data breach litigation.",
    inputPrompt: "in re us office of personnel management data sec breach litig 928 f3d 42 2019",
    expectedCitation: "In re U.S. Off. of Pers. Mgmt. Data Sec. Breach Litig., 928 F.3d 42 (D.C. Cir. 2019)."
  },
  {
    id: 53,
    sourceType: "case",
    context: "D.C. Court of Appeals case regarding representative actions and CPPA class action requirements.",
    inputPrompt: "rotunda vs marriott international 123 a3d 980 from dc court of appeals 2015",
    expectedCitation: "Rotunda v. Marriott Int'l, Inc., 123 A.3d 980 (D.C. 2015)."
  },
  {
    id: 54,
    sourceType: "case",
    context: "D.C. Court of Appeals 2025 decision limiting tester standing under the CPPA.",
    inputPrompt: "nides v dvc industries 334 a.3d 1134 dc 2025 tester standing",
    expectedCitation: "Nides v. DVC Indus., 334 A.3d 1134 (D.C. 2025)."
  },
  {
    id: 55,
    sourceType: "case",
    context: "Supreme Court foundational precedent on Article III standing and concrete injury.",
    inputPrompt: "spokeo inc v robins 578 u.s. 330 2016",
    expectedCitation: "Spokeo, Inc. v. Robins, 578 U.S. 330 (2016)."
  },
  {
    id: 56,
    sourceType: "case",
    context: "Supreme Court precedent determining that risk of future harm alone is insufficient for damages standing.",
    inputPrompt: "transunion llc v ramirez 594 us 413 2021",
    expectedCitation: "TransUnion LLC v. Ramirez, 594 U.S. 413 (2021)."
  },
  {
    id: 57,
    sourceType: "case",
    context: "D.C. Circuit case affirming enforcement of stipulated ESI and discovery orders.",
    inputPrompt: "in re fannie mae securities litigation 552 f3d 814 dc cir 2009",
    expectedCitation: "In re Fannie Mae Sec. Litig., 552 F.3d 814 (D.C. Cir. 2009)."
  },
  {
    id: 58,
    sourceType: "case",
    context: "D.D.C. decision imposing discovery sanctions under inherent authority and Rule 37.",
    inputPrompt: "parsi v daioleslam 286 f r d 73 ddc 2012 sanctions order",
    expectedCitation: "Parsi v. Daioleslam, 286 F.R.D. 73 (D.D.C. 2012)."
  },
  {
    id: 59,
    sourceType: "case",
    context: "D.C. Circuit mandamus opinion establishing parameters of attorney-client privilege in internal investigations.",
    inputPrompt: "in re kellogg brown & root inc 756 f.3d 754 2014 d.c. cir",
    expectedCitation: "In re Kellogg Brown & Root, Inc., 756 F.3d 754 (D.C. Cir. 2014)."
  },
  {
    id: 60,
    sourceType: "case",
    context: "D.D.C. decision remanding CPPA claim due to lack of Article III standing for organizational plaintiff.",
    inputPrompt: "travelers united v hyatt hotels corp 23-2776 2025 d.d.c. january 3",
    expectedCitation: "Travelers United, Inc. v. Hyatt Hotels Corp., No. 23-2776, 2025 U.S. Dist. LEXIS 100 (D.D.C. Jan. 3, 2025)."
  },
  {
    id: 61,
    sourceType: "case",
    context: "Fourth Circuit leading spoliation precedent prior to 2015 FRCP 37 amendments.",
    inputPrompt: "silvestri v gen motors corp 271 f3d 583 4th cir 2001",
    expectedCitation: "Silvestri v. Gen. Motors Corp., 271 F.3d 583 (4th Cir. 2001)."
  },
  {
    id: 62,
    sourceType: "case",
    context: "Fifth Circuit precedent emphasizing the necessity of understanding merits in class certification.",
    inputPrompt: "castano v am tobacco co 84 f3d 734 5th cir 1996",
    expectedCitation: "Castano v. Am. Tobacco Co., 84 F.3d 734 (5th Cir. 1996)."
  },
  {
    id: 63,
    sourceType: "case",
    context: "Older D.C. Court of Appeals case format.",
    inputPrompt: "dorsey v district of columbia 917 a2d 639 dc 2007",
    expectedCitation: "Dorsey v. District of Columbia, 917 A.2d 639 (D.C. 2007)."
  },
  {
    id: 64,
    sourceType: "case",
    context: "Example of a D.C. Circuit case requiring parallel U.S. App. D.C. citation locally.",
    inputPrompt: "gross v winter 277 us app dc 406",
    expectedCitation: "Gross v. Winter, 277 U.S. App. D.C. 406, 876 F.2d 165 (1989)."
  },
  {
    id: 65,
    sourceType: "case",
    context: "Fifth Circuit 2025 decision analyzing Article III injury in fact at the class certification stage.",
    inputPrompt: "wilson v centene mgmt co llc 24-50044 5th cir july 17 2025",
    expectedCitation: "Wilson v. Centene Mgmt. Co., L.L.C., No. 24-50044, 2025 WL 1981287 (5th Cir. July 17, 2025)."
  },
  {
    id: 66,
    sourceType: "statute",
    context: "D.C. Code definition section for Consumer Security Breach Notification Act.",
    inputPrompt: "dc code 28-3851 definitions data breach",
    expectedCitation: "D.C. Code § 28-3851."
  },
  {
    id: 67,
    sourceType: "statute",
    context: "D.C. Code notification requirements for security breach.",
    inputPrompt: "dc code sec 28-3852 notification of security breach",
    expectedCitation: "D.C. Code § 28-3852."
  },
  {
    id: 68,
    sourceType: "statute",
    context: "D.C. CPPA statutory provision defining unfair and deceptive trade practices.",
    inputPrompt: "d.c. code 28-3904 unfair trade practice",
    expectedCitation: "D.C. Code § 28-3904."
  },
  {
    id: 69,
    sourceType: "statute",
    context: "D.C. CPPA statutory provision regarding private attorney general / public interest organization standing.",
    inputPrompt: "dc code 28-3905 k 1 d standing cppa",
    expectedCitation: "D.C. Code § 28-3905(k)(1)(D)."
  },
  {
    id: 70,
    sourceType: "statute",
    context: "Federal Privacy Act provision concerning civil remedies and willful violations.",
    inputPrompt: "5 u.s.c. 552a g 4 privacy act",
    expectedCitation: "5 U.S.C. § 552a(g)(4)."
  },
  {
    id: 71,
    sourceType: "statute",
    context: "Federal Class Action Fairness Act (CAFA) jurisdiction provision.",
    inputPrompt: "28 usc 1332 d cafa removal",
    expectedCitation: "28 U.S.C. § 1332(d)."
  },
  {
    id: 72,
    sourceType: "statute",
    context: "Federal Gramm-Leach-Bliley Act (GLBA) enforcement authority provision.",
    inputPrompt: "15 usc 6805 section 505 glba",
    expectedCitation: "15 U.S.C. § 6805."
  },
  {
    id: 73,
    sourceType: "statute",
    context: "Fair Credit Reporting Act (FCRA) preemption provision.",
    inputPrompt: "15 usc 1681h(e) fcra preemption",
    expectedCitation: "15 U.S.C. § 1681h(e)."
  },
  {
    id: 74,
    sourceType: "statute",
    context: "D.C. Code provision authorizing Attorney General subpoenas.",
    inputPrompt: "dc code 1-301.89c oag subpoena",
    expectedCitation: "D.C. Code § 1-301.89c."
  },
  {
    id: 75,
    sourceType: "statute",
    context: "D.C. Code provision on Human Rights and disability accommodations.",
    inputPrompt: "dc code 2-1402.21 d 3 B",
    expectedCitation: "D.C. Code § 2-1402.21(d)(3)(B)."
  },
  {
    id: 76,
    sourceType: "court_rule",
    context: "Federal rule governing proportionality and limits on discovering ESI.",
    inputPrompt: "frcp 26 b 2 B esi discovery not reasonably accessible",
    expectedCitation: "Fed. R. Civ. P. 26(b)(2)(B)."
  },
  {
    id: 77,
    sourceType: "court_rule",
    context: "Federal rule providing sanctions for failure to preserve electronically stored information.",
    inputPrompt: "rule 37 e federal rules of civil procedure spoliation",
    expectedCitation: "Fed. R. Civ. P. 37(e)."
  },
  {
    id: 78,
    sourceType: "court_rule",
    context: "Federal rule limiting waiver of attorney-client privilege for inadvertent disclosure.",
    inputPrompt: "fre 502 b inadvertent disclosure",
    expectedCitation: "Fed. R. Evid. 502(b)."
  },
  {
    id: 79,
    sourceType: "court_rule",
    context: "D.D.C. Local Rule governing discovery tiers and exemptions.",
    inputPrompt: "ddc local rule lcvr 26.2",
    expectedCitation: "D.D.C. LCvR 26.2."
  },
  {
    id: 80,
    sourceType: "court_rule",
    context: "D.D.C. Local Rule governing meet and confer obligations and scheduling.",
    inputPrompt: "local rule 16.3 meet and confer ddc",
    expectedCitation: "D.D.C. LCvR 16.3."
  },
  {
    id: 81,
    sourceType: "court_rule",
    context: "D.C. Superior Court rule governing class actions and representative suits.",
    inputPrompt: "d.c. superior court rule of civil procedure 23",
    expectedCitation: "D.C. Super. Ct. R. Civ. P. 23."
  },
  {
    id: 82,
    sourceType: "court_rule",
    context: "Federal rule governing injunctive class actions.",
    inputPrompt: "frcp 23 b 2 class cert",
    expectedCitation: "Fed. R. Civ. P. 23(b)(2)."
  },
  {
    id: 83,
    sourceType: "court_rule",
    context: "Federal rule governing initial disclosures.",
    inputPrompt: "fed r civ p 26 a 1 initial disclosures",
    expectedCitation: "Fed. R. Civ. P. 26(a)(1)."
  },
  {
    id: 84,
    sourceType: "regulation",
    context: "HIPAA Privacy Rule regarding uses and disclosures of PHI.",
    inputPrompt: "45 cfr 164.502 hipaa privacy rule",
    expectedCitation: "45 C.F.R. § 164.502 (2024)."
  },
  {
    id: 85,
    sourceType: "regulation",
    context: "COPPA regulation governing deceptive acts in collecting children's data online.",
    inputPrompt: "16 cfr 312.3 coppa rule 2025",
    expectedCitation: "16 C.F.R. § 312.3 (2025)."
  },
  {
    id: 86,
    sourceType: "regulation",
    context: "GLBA Safeguards Rule outlining administrative and technical security standards.",
    inputPrompt: "ftc safeguards rule 16 c.f.r. 314.3",
    expectedCitation: "16 C.F.R. § 314.3 (2024)."
  },
  {
    id: 87,
    sourceType: "regulation",
    context: "D.C. Municipal Regulations regarding CPPA Procedural Rules.",
    inputPrompt: "dcmr title 16 chapter 15 consumer protection procedures act",
    expectedCitation: "D.C. Mun. Regs. tit. 16, § 15 (2025)."
  },
  {
    id: 88,
    sourceType: "regulation",
    context: "D.C. Municipal Regulations on Public Service Commission rules regarding Consumer Rights.",
    inputPrompt: "dcmr title 15 sec 304.22 public service commission",
    expectedCitation: "D.C. Mun. Regs. tit. 15, § 304.22 (2025)."
  },
  {
    id: 89,
    sourceType: "regulation",
    context: "Federal Reserve regulation detailing financial institution activities.",
    inputPrompt: "12 cfr 225.28 federal reserve activities",
    expectedCitation: "12 C.F.R. § 225.28 (2024)."
  },
  {
    id: 90,
    sourceType: "regulation",
    context: "FTC Credit Practices Rule.",
    inputPrompt: "16 cfr 444.1 ftc credit practices",
    expectedCitation: "16 C.F.R. § 444.1 (2024)."
  },
  {
    id: 91,
    sourceType: "secondary",
    context: "Federal Judicial Center treatise on managing complex discovery and class actions.",
    inputPrompt: "manual for complex litigation fourth edition section 11.632",
    expectedCitation: "Manual for Complex Litigation (Fourth) § 11.632 (2004)."
  },
  {
    id: 92,
    sourceType: "secondary",
    context: "Leading treatise on federal civil procedure, specifically rule 26 discovery.",
    inputPrompt: "wright and miller federal practice and procedure sec 1006 3d edition 1998",
    expectedCitation: "21 Charles Alan Wright & Arthur R. Miller, Federal Practice and Procedure § 1006 (3d ed. 1998)."
  },
  {
    id: 93,
    sourceType: "secondary",
    context: "Restatement standard for intrusion upon seclusion in privacy torts.",
    inputPrompt: "restatement second of torts section 652b",
    expectedCitation: "Restatement (Second) of Torts § 652B (Am. Law Inst. 1977)."
  },
  {
    id: 94,
    sourceType: "secondary",
    context: "Leading industry standards for electronic document production.",
    inputPrompt: "the sedona principles third edition 19 sedona conf j 1 2018",
    expectedCitation: "The Sedona Principles, Third Edition: Best Practices, Recommendations & Principles for Addressing Electronic Document Production, 19 Sedona Conf. J. 1 (2018)."
  },
  {
    id: 95,
    sourceType: "secondary",
    context: "Leading evidentiary treatise.",
    inputPrompt: "mccormick on evidence 8th edition 2020",
    expectedCitation: "1 McCormick on Evidence § 1 (Robert P. Mosteller et al. eds., 8th ed. 2020)."
  },
  {
    id: 96,
    sourceType: "secondary",
    context: "Leading torts treatise.",
    inputPrompt: "prosser and keeton on the law of torts 5th edition 1984",
    expectedCitation: "W. Page Keeton et al., Prosser and Keeton on the Law of Torts § 1 (5th ed. 1984)."
  },
  {
    id: 97,
    sourceType: "secondary",
    context: "Indispensable local resource for D.C. litigators.",
    inputPrompt: "d.c. practice manual 2024 edition 29th ed",
    expectedCitation: "District of Columbia Practice Manual (29th ed. 2024)."
  },
  {
    id: 98,
    sourceType: "secondary",
    context: "Legal dictionary.",
    inputPrompt: "blacks law dictionary 10th edition 2014 good faith bargaining",
    expectedCitation: "Black's Law Dictionary (10th ed. 2014)."
  },
  {
    id: 99,
    sourceType: "secondary",
    context: "ABA publication on managing E-Discovery.",
    inputPrompt: "managing e-discovery and esi american bar association 2011",
    expectedCitation: "Am. Bar Ass'n, Managing E-Discovery and ESI: From Pre-Litigation Through Trial (2011)."
  },
  {
    id: 100,
    sourceType: "secondary",
    context: "Federal procedure treatise.",
    inputPrompt: "moore's federal practice 3d ed",
    expectedCitation: "17A James William Moore et al., Moore's Federal Practice (3d ed. 2015)."
  }
];