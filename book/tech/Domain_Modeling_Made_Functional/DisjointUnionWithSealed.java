sealed interface FruitSnack permits AppleVariety, BananaVariety, CherryVariety {}

enum AppleVariety implements FruitSnack {
    GOLDEN_DELICIOUS,
    GRANNY_SMITH,
    FUJI
}

enum BananaVariety implements FruitSnack {
    CAVENDISH,
    GROS_MICHEL,
    MANZANO
}

enum CherryVariety implements FruitSnack {
    MONTMORENCY,
    BING
}
